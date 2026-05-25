import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type ProgressState = Record<string, string[]>;

export type UserData = {
  id: string;
  email: string;
  displayName?: string;
  progress: ProgressState;
  lastVisited?: string;
};

type AuthContextType = {
  user: UserData | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  setModuleProgress: (moduleId: string, topicIds: string[]) => Promise<void>;
  updateLastVisited: (path: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// profiles are created when a user signs up via Supabase Auth; we no longer create users directly.

async function getUserData(userId: string): Promise<UserData | null> {
  // Buscar profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, display_name')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.warn('Profile not found:', profileError);
  }

  // Buscar progresso
  const { data: progressRecords } = await supabase
    .from('user_progress')
    .select('module_id, completed_topics, last_visited')
    .eq('user_id', userId);

  const progress: ProgressState = {};
  let lastVisited: string | undefined;

  if (progressRecords) {
    progressRecords.forEach((record) => {
      progress[record.module_id] = record.completed_topics || [];
      if (record.last_visited) lastVisited = record.last_visited;
    });
  }

  // Obter email do usuário autenticado (se disponível)
  const { data: authData } = await supabase.auth.getUser();
  const email = (authData as any)?.user?.email ?? undefined;

  return {
    id: userId,
    email: email ?? '',
    displayName: (profile as any)?.display_name ?? undefined,
    progress,
    lastVisited,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [ready, setReady] = useState(false);

  const loadUser = async (userId: string) => {
    try {
      const userData = await getUserData(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setReady(true);
    }
  };

  // Inicializa sessão e escuta mudanças de autenticação
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = (data as any)?.session;
        if (session?.user?.id) {
          await loadUser(session.user.id);
        } else {
          setReady(true);
        }
      } catch (err) {
        console.error('Auth init error', err);
        setReady(true);
      }
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.user?.id) {
        loadUser(session.user.id);
      } else {
        setUser(null);
        setReady(true);
      }
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const signIn = async (email: string, password?: string) => {
    try {
      if (!password) throw new Error('Password required');
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const userId = (data.user as any).id;
      await loadUser(userId);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const createdUser = (data.user as any) || (data as any)?.user;
      if (createdUser?.id) {
        // criar profile ligado ao auth uid
        await supabase.from('profiles').upsert({ id: createdUser.id, display_name: displayName });
        await loadUser(createdUser.id);
      } else {
        // signUp requires email confirm; inform caller
        throw new Error('Confirme seu email. Verifique a caixa de entrada.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const setModuleProgress = async (moduleId: string, topicIds: string[]) => {
    if (!user) return;

    try {
      // Inserir ou atualizar progresso
      const { error } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_id: user.id,
            module_id: moduleId,
            completed_topics: topicIds,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,module_id" }
        );

      if (error) throw error;

      // Atualizar estado local
      const updated: UserData = {
        ...user,
        progress: {
          ...user.progress,
          [moduleId]: topicIds,
        },
      };
      setUser(updated);
    } catch (error) {
      console.error("Error setting module progress:", error);
      throw error;
    }
  };

  const updateLastVisited = async (path: string) => {
    if (!user) return;

    // Não faz nada se já está com o mesmo valor (evita loops de atualização)
    if (user.lastVisited === path) return;

    try {
      // Atualizar a página visitada para cada módulo do usuário
      const { error } = await supabase
        .from("user_progress")
        .update({ last_visited: path, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);

      if (error) throw error;

      // Atualizar estado local somente se mudou
      const updated: UserData = {
        ...user,
        lastVisited: path,
      };
      setUser((prev) => {
        if (!prev) return updated;
        if (prev.lastVisited === updated.lastVisited) return prev;
        return updated;
      });
    } catch (error) {
      console.error("Error updating last visited:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signUp, signOut, setModuleProgress, updateLastVisited }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
