import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../../lib/supabase";
import type { AuthContextType, UserData } from "../types/auth";
import * as authService from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [ready, setReady] = useState(false);
  const userRef = useRef<UserData | null>(null);

  const replaceUser = useCallback((nextUser: UserData | null) => {
    userRef.current = nextUser;
    setUser(nextUser);
  }, []);

  const updateUser = useCallback((updater: (current: UserData | null) => UserData | null) => {
    const nextUser = updater(userRef.current);
    userRef.current = nextUser;
    setUser(nextUser);
  }, []);

  const loadUser = useCallback(
    async (userId: string, fallback?: { email?: string; displayName?: string }) => {
      try {
        const userData = await authService.getUserData(userId, fallback);
        replaceUser(userData);
        return userData;
      } catch (error) {
        console.error("Error loading user:", error);
        replaceUser(null);
        return null;
      }
    },
    [replaceUser]
  );

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!active) return;

        if (session?.user) {
          await loadUser(session.user.id);
        } else {
          replaceUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (active) replaceUser(null);
      } finally {
        if (active) setReady(true);
      }
    };

    void initialize();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        void (async () => {
          if (session?.user) {
            await loadUser(session.user.id);
          } else {
            replaceUser(null);
          }
          if (active) setReady(true);
        })();
      }, 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [loadUser, replaceUser]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const normalizedEmail = authService.normalizeEmail(email);
      const { userId } = await authService.signInWithPassword(normalizedEmail, password);

      if (!userId) {
        throw new Error("Falha ao obter usuário após login");
      }

      try {
        await authService.ensureUserRow(userId, normalizedEmail);
      } catch (error) {
        console.warn("Profile sync after sign-in failed; continuing with auth session.", error);
      }

      const userData = await loadUser(userId, { email: normalizedEmail });

      if (!userData) {
        throw new Error(
          "Login bem-sucedido, mas não foi possível carregar seu perfil. Atualize a página e tente novamente."
        );
      }
    },
    [loadUser]
  );

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      const normalizedEmail = authService.normalizeEmail(email);
      const trimmedName = displayName.trim();
      const { user: createdUser, session } = await authService.signUpWithPassword(
        normalizedEmail,
        password,
        trimmedName
      );

      if (!createdUser) {
        throw new Error("Conta criada, mas não foi possível iniciar sessão automaticamente.");
      }

      if (!session) {
        throw new Error(
          "Conta criada. Verifique seu e-mail para confirmar o cadastro e depois entre com sua senha."
        );
      }

      await authService.upsertProfile(createdUser.id, normalizedEmail, trimmedName);
      await loadUser(createdUser.id, { email: normalizedEmail, displayName: trimmedName });
    },
    [loadUser]
  );

  const signOut = useCallback(async () => {
    try {
      await authService.signOutAuth();
    } finally {
      replaceUser(null);
    }
  }, [replaceUser]);

  const setModuleProgress = useCallback(
    async (moduleId: string, topicIds: string[]) => {
      const currentUser = userRef.current;
      if (!currentUser) return;

      await authService.ensureUserRow(currentUser.id, currentUser.email, currentUser.displayName);
      await authService.upsertModuleProgress(currentUser.id, moduleId, topicIds);

      updateUser((previous) => {
        if (!previous || previous.id !== currentUser.id) return previous;
        return {
          ...previous,
          progress: {
            ...previous.progress,
            [moduleId]: topicIds,
          },
        };
      });
    },
    [updateUser]
  );

  const updateLastVisited = useCallback(
    async (path: string) => {
      const currentUser = userRef.current;
      if (!currentUser || currentUser.lastVisited === path) return;

      await authService.updateLastVisited(currentUser.id, path);

      updateUser((previous) => {
        if (!previous || previous.id !== currentUser.id || previous.lastVisited === path) {
          return previous;
        }

        return {
          ...previous,
          lastVisited: path,
        };
      });
    },
    [updateUser]
  );

  const value = useMemo(
    () => ({
      user,
      ready,
      signIn,
      signUp,
      signOut,
      setModuleProgress,
      updateLastVisited,
    }),
    [user, ready, signIn, signUp, signOut, setModuleProgress, updateLastVisited]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
