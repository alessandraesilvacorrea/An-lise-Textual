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
  // email and optional displayName (used when creating a new account)
  signIn: (email: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  setModuleProgress: (moduleId: string, topicIds: string[]) => Promise<void>;
  updateLastVisited: (path: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getOrCreateUser(email: string, displayName?: string): Promise<string> {
  // Verificar se usuário existe
  const { data: existingUser } = await supabase
    .from("users")
    .select("id, display_name")
    .eq("email", email)
    .single();

  if (existingUser) {
    // se fornecido displayName diferente, atualiza
    if (displayName && existingUser.display_name !== displayName) {
      await supabase.from('users').update({ display_name: displayName }).eq('id', existingUser.id);
    }
    return existingUser.id;
  }

  // Criar novo usuário
  const insertPayload: any = { email };
  if (displayName) insertPayload.display_name = displayName;

  const { data: newUser, error } = await supabase
    .from("users")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) throw error;
  return newUser.id;
}

async function getUserData(userId: string): Promise<UserData | null> {
  // Buscar usuário
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, email, display_name")
    .eq("id", userId)
    .single();

  if (userError || !user) return null;

  // Buscar progresso
  const { data: progressRecords } = await supabase
    .from("user_progress")
    .select("module_id, completed_topics, last_visited")
    .eq("user_id", userId);

  const progress: ProgressState = {};
  let lastVisited: string | undefined;

  if (progressRecords) {
    progressRecords.forEach((record) => {
      progress[record.module_id] = record.completed_topics || [];
      if (record.last_visited) lastVisited = record.last_visited;
    });
  }

  return {
    id: user.id,
    email: user.email,
    displayName: (user as any).display_name ?? undefined,
    progress,
    lastVisited,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [ready, setReady] = useState(false);

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    const storedUserId = localStorage.getItem("textlab-user-id");
    if (storedUserId) {
      loadUser(storedUserId);
    } else {
      setReady(true);
    }
  }, []);

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

  const signIn = async (email: string) => {
    try {
      const userId = await getOrCreateUser(email.trim().toLowerCase());
      localStorage.setItem("textlab-user-id", userId);
      await loadUser(userId);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  // novo método que aceita displayName para criação de conta
  const signInWithName = async (email: string, displayName?: string) => {
    try {
      const userId = await getOrCreateUser(email.trim().toLowerCase(), displayName?.trim() || undefined);
      localStorage.setItem("textlab-user-id", userId);
      await loadUser(userId);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("textlab-user-id");
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
    <AuthContext.Provider value={{ user, ready, signIn: signInWithName as any, signOut, setModuleProgress, updateLastVisited }}>
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
