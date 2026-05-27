export type ProgressState = Record<string, string[]>;

export type ExerciseAttempt = {
  id: string;
  moduleId: string;
  topicId: string;
  topicName: string;
  exerciseId: string;
  exerciseTitle: string;
  question: string;
  selectedAnswer: number;
  selectedOption: string;
  correctAnswer: number;
  correctOption: string;
  isCorrect: boolean;
  attemptedAt: string;
};

export type ExerciseAttemptInput = Omit<ExerciseAttempt, "id" | "attemptedAt">;

export type SignUpResult = {
  status: "signed-in" | "confirmation-required";
  email: string;
};

export type AccountEmailChangeResult = {
  email: string;
};

export type UserData = {
  id: string;
  email: string;
  displayName?: string;
  progress: ProgressState;
  exerciseAttempts: ExerciseAttempt[];
  lastVisited?: string;
};

export type AuthContextType = {
  user: UserData | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
  setModuleProgress: (moduleId: string, topicIds: string[]) => Promise<void>;
  recordExerciseAttempt: (attempt: ExerciseAttemptInput) => Promise<void>;
  updateLastVisited: (path: string) => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;
  requestEmailChange: (email: string) => Promise<AccountEmailChangeResult>;
  updatePassword: (password: string) => Promise<void>;
};
