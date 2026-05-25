export type ProgressState = Record<string, string[]>;

export type UserData = {
  id: string;
  email: string;
  displayName?: string;
  progress: ProgressState;
  lastVisited?: string;
};

export type AuthContextType = {
  user: UserData | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  setModuleProgress: (moduleId: string, topicIds: string[]) => Promise<void>;
  updateLastVisited: (path: string) => Promise<void>;
};
