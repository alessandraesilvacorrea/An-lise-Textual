import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type ProgressState = Record<string, string[]>;

export type UserData = {
  id: string;
  email: string;
  progress: ProgressState;
  lastVisited?: string;
};

type AuthContextType = {
  user: UserData | null;
  ready: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  setModuleProgress: (moduleId: string, topicIds: string[]) => Promise<void>;
  updateLastVisited: (path: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getOrCreateUser(email: string): Promise<string> {
  // Verificar se usuário existe
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return existingUser.id;
  }

  // Criar novo usuário
  const { data: newUser, error } = await supabase
    .from("users")
    .insert({ email })
    .select("id")
    .single();

  if (error) throw error;
  return newUser.id;
}

async function getUserData(userId: string): Promise<UserData | null> {
  // Buscar usuário
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, email")
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

    try {
      // Atualizar a página visitada para cada módulo do usuário
      const { error } = await supabase
        .from("user_progress")
        .update({ last_visited: path, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);

      if (error) throw error;

      // Atualizar estado local
      const updated: UserData = {
        ...user,
        lastVisited: path,
      };
      setUser(updated);
    } catch (error) {
      console.error("Error updating last visited:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signOut, setModuleProgress, updateLastVisited }}>
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
