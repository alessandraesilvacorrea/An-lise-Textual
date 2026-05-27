import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import type {
  AccountEmailChangeResult,
  ExerciseAttempt,
  ExerciseAttemptInput,
  ProgressState,
  UserData,
} from "../types/auth";

type UserProfileRow = {
  email: string | null;
  display_name: string | null;
};

type ProgressRow = {
  module_id: string;
  completed_topics: string[] | null;
  last_visited: string | null;
};

type ExerciseAttemptRow = {
  id: string;
  module_id: string;
  topic_id: string;
  topic_name: string;
  exercise_id: string;
  exercise_title: string;
  question: string;
  selected_answer: number;
  selected_option: string;
  correct_answer: number;
  correct_option: string;
  is_correct: boolean;
  attempted_at: string;
};

type UserDataFallback = {
  email?: string;
  displayName?: string;
};

const LOCAL_ATTEMPTS_PREFIX = "textlab:exercise-attempts:";
const MAX_LOCAL_ATTEMPTS = 500;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isMissingColumnError(error: unknown, columnName: string) {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { code?: string; message?: string };
  const message = candidate.message?.toLowerCase() ?? "";
  const column = columnName.toLowerCase();

  return (
    candidate.code === "42703" ||
    candidate.code === "PGRST204" ||
    (message.includes(column) && (message.includes("schema cache") || message.includes("does not exist")))
  );
}

function isMissingTableError(error: unknown, tableName: string) {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { code?: string; message?: string };
  const message = candidate.message?.toLowerCase() ?? "";
  const table = tableName.toLowerCase();

  return (
    candidate.code === "42P01" ||
    candidate.code === "PGRST205" ||
    (message.includes(table) && (message.includes("schema cache") || message.includes("does not exist")))
  );
}

function createLocalAttemptId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? `local-${crypto.randomUUID()}`
    : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getLocalAttemptsKey(userId: string) {
  return `${LOCAL_ATTEMPTS_PREFIX}${userId}`;
}

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function sortAttemptsByDate(attempts: ExerciseAttempt[]) {
  return [...attempts].sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime());
}

function mergeExerciseAttempts(...groups: ExerciseAttempt[][]) {
  const attemptsById = new Map<string, ExerciseAttempt>();

  groups.flat().forEach((attempt) => {
    attemptsById.set(attempt.id, attempt);
  });

  return sortAttemptsByDate(Array.from(attemptsById.values()));
}

function getStoredExerciseAttempts(userId: string): ExerciseAttempt[] {
  if (!canUseLocalStorage()) return [];

  try {
    const raw = window.localStorage.getItem(getLocalAttemptsKey(userId));
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? sortAttemptsByDate(parsed as ExerciseAttempt[]) : [];
  } catch (error) {
    console.warn("Could not read local exercise attempts.", error);
    return [];
  }
}

function setStoredExerciseAttempts(userId: string, attempts: ExerciseAttempt[]) {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.setItem(
      getLocalAttemptsKey(userId),
      JSON.stringify(sortAttemptsByDate(attempts).slice(0, MAX_LOCAL_ATTEMPTS))
    );
  } catch (error) {
    console.warn("Could not save local exercise attempts.", error);
  }
}

function clearStoredExerciseAttempts(userId: string) {
  if (!canUseLocalStorage()) return;

  try {
    window.localStorage.removeItem(getLocalAttemptsKey(userId));
  } catch (error) {
    console.warn("Could not clear local exercise attempts.", error);
  }
}

function storeExerciseAttemptLocally(userId: string, attempt: ExerciseAttempt) {
  const storedAttempts = getStoredExerciseAttempts(userId);
  setStoredExerciseAttempts(userId, mergeExerciseAttempts([attempt], storedAttempts));
}

function mapExerciseAttempt(row: ExerciseAttemptRow): ExerciseAttempt {
  return {
    id: row.id,
    moduleId: row.module_id,
    topicId: row.topic_id,
    topicName: row.topic_name,
    exerciseId: row.exercise_id,
    exerciseTitle: row.exercise_title,
    question: row.question,
    selectedAnswer: row.selected_answer,
    selectedOption: row.selected_option,
    correctAnswer: row.correct_answer,
    correctOption: row.correct_option,
    isCorrect: row.is_correct,
    attemptedAt: row.attempted_at,
  };
}

function createExerciseAttemptPayload(userId: string, attempt: ExerciseAttemptInput, attemptedAt: string) {
  return {
    user_id: userId,
    module_id: attempt.moduleId,
    topic_id: attempt.topicId,
    topic_name: attempt.topicName,
    exercise_id: attempt.exerciseId,
    exercise_title: attempt.exerciseTitle,
    question: attempt.question,
    selected_answer: attempt.selectedAnswer,
    selected_option: attempt.selectedOption,
    correct_answer: attempt.correctAnswer,
    correct_option: attempt.correctOption,
    is_correct: attempt.isCorrect,
    attempted_at: attemptedAt,
  };
}

function createExerciseAttemptPayloadFromSavedAttempt(userId: string, attempt: ExerciseAttempt) {
  return createExerciseAttemptPayload(userId, attempt, attempt.attemptedAt);
}

async function getRemoteExerciseAttempts(userId: string): Promise<{
  attempts: ExerciseAttempt[];
  storageAvailable: boolean;
}> {
  const { data, error } = await supabase
    .from("user_exercise_attempts")
    .select(
      "id, module_id, topic_id, topic_name, exercise_id, exercise_title, question, selected_answer, selected_option, correct_answer, correct_option, is_correct, attempted_at"
    )
    .eq("user_id", userId)
    .order("attempted_at", { ascending: false })
    .returns<ExerciseAttemptRow[]>();

  if (error) {
    if (isMissingTableError(error, "user_exercise_attempts")) {
      console.warn("user_exercise_attempts table is missing; using local exercise analytics until setup SQL is applied.");
      return { attempts: [], storageAvailable: false };
    }

    console.error("Exercise attempts load error:", error);
    return { attempts: [], storageAvailable: false };
  }

  return { attempts: data.map(mapExerciseAttempt), storageAvailable: true };
}

async function syncStoredExerciseAttempts(userId: string): Promise<ExerciseAttempt[]> {
  const storedAttempts = getStoredExerciseAttempts(userId);
  if (!storedAttempts.length) return [];

  const payload = storedAttempts.map((attempt) => createExerciseAttemptPayloadFromSavedAttempt(userId, attempt));
  const { data, error } = await supabase
    .from("user_exercise_attempts")
    .insert(payload)
    .select(
      "id, module_id, topic_id, topic_name, exercise_id, exercise_title, question, selected_answer, selected_option, correct_answer, correct_option, is_correct, attempted_at"
    )
    .returns<ExerciseAttemptRow[]>();

  if (error) {
    if (!isMissingTableError(error, "user_exercise_attempts")) {
      console.warn("Could not sync local exercise attempts to Supabase.", error);
    }
    return storedAttempts;
  }

  clearStoredExerciseAttempts(userId);
  return data.map(mapExerciseAttempt);
}

async function getExerciseAttempts(userId: string): Promise<ExerciseAttempt[]> {
  const storedAttempts = getStoredExerciseAttempts(userId);
  const { attempts: remoteAttempts, storageAvailable } = await getRemoteExerciseAttempts(userId);

  if (!storageAvailable) {
    return storedAttempts;
  }

  if (!storedAttempts.length) {
    return remoteAttempts;
  }

  const syncedAttempts = await syncStoredExerciseAttempts(userId);
  return mergeExerciseAttempts(remoteAttempts, syncedAttempts);
}

function getDisplayNameFromAuthUser(user: User | null | undefined) {
  const displayName = user?.user_metadata?.display_name;
  return typeof displayName === "string" && displayName.trim() ? displayName.trim() : undefined;
}

async function tryEnsureUserRow(userId: string, email: string, displayName?: string) {
  try {
    await ensureUserRow(userId, email, displayName);
    return true;
  } catch (error) {
    console.warn("Profile sync failed; continuing with auth session data.", error);
    return false;
  }
}

async function getProfile(userId: string): Promise<{ displayName?: string; email?: string } | null> {
  const { data, error } = await supabase
    .from("users")
    .select("email, display_name")
    .eq("id", userId)
    .maybeSingle<UserProfileRow>();

  if (error) {
    if (isMissingColumnError(error, "display_name")) {
      const { data: emailOnlyData, error: emailOnlyError } = await supabase
        .from("users")
        .select("email")
        .eq("id", userId)
        .maybeSingle<{ email: string | null }>();

      if (emailOnlyError) {
        console.error("Profile fallback load error:", emailOnlyError);
        throw emailOnlyError;
      }

      return emailOnlyData ? { email: emailOnlyData.email ?? undefined } : null;
    }

    console.error("Profile load error:", error);
    throw error;
  }

  if (!data) return null;

  return {
    email: data.email ?? undefined,
    displayName: data.display_name ?? undefined,
  };
}

export async function ensureUserRow(userId: string, email: string, displayName?: string) {
  const normalizedEmail = normalizeEmail(email);
  const payload: { id: string; email: string; display_name?: string } = {
    id: userId,
    email: normalizedEmail,
  };

  if (displayName?.trim()) {
    payload.display_name = displayName.trim();
  }

  const { error } = await supabase.from("users").upsert(payload);

  if (error) {
    if (payload.display_name && isMissingColumnError(error, "display_name")) {
      const { error: fallbackError } = await supabase.from("users").upsert({
        id: userId,
        email: normalizedEmail,
      });

      if (!fallbackError) return;

      console.error("Error ensuring user row without display name:", fallbackError);
      throw fallbackError;
    }

    console.error("Error ensuring user row:", error);
    throw error;
  }
}

export async function getUserData(userId: string, fallback: UserDataFallback = {}): Promise<UserData | null> {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching auth user:", authError);
  }

  const authUser = authData?.user ?? null;
  let profile: { displayName?: string; email?: string } | null = null;
  let profileReadFailed = false;

  try {
    profile = await getProfile(userId);
  } catch (error) {
    if (!authUser?.email && !fallback.email) {
      throw error;
    }

    profileReadFailed = true;
    console.warn("Profile table could not be read; using auth session data instead.", error);
  }

  const email = normalizeEmail(authUser?.email ?? profile?.email ?? fallback.email ?? "");
  const authDisplayName = getDisplayNameFromAuthUser(authUser) ?? fallback.displayName;

  if (!email) return null;

  if (!profile && !profileReadFailed) {
    await tryEnsureUserRow(userId, email, authDisplayName);
    profile = { email, displayName: authDisplayName };
  } else if (profile && !profile.displayName && authDisplayName) {
    await tryEnsureUserRow(userId, email, authDisplayName);
    profile = { ...profile, displayName: authDisplayName };
  }

  let progressRecords: ProgressRow[] | null = null;
  const { data, error: progressError } = await supabase
    .from("user_progress")
    .select("module_id, completed_topics, last_visited")
    .eq("user_id", userId)
    .returns<ProgressRow[]>();

  if (progressError) {
    if (isMissingColumnError(progressError, "last_visited")) {
      const { data: fallbackProgress, error: fallbackProgressError } = await supabase
        .from("user_progress")
        .select("module_id, completed_topics")
        .eq("user_id", userId)
        .returns<Array<Omit<ProgressRow, "last_visited">>>();

      if (fallbackProgressError) {
        console.error("Progress fallback load error:", fallbackProgressError);
      } else {
        progressRecords = fallbackProgress.map((record) => ({ ...record, last_visited: null }));
      }
    } else {
      console.error("Progress load error:", progressError);
    }
  } else {
    progressRecords = data;
  }

  const progress: ProgressState = {};
  let lastVisited: string | undefined;

  progressRecords?.forEach((record) => {
    progress[record.module_id] = record.completed_topics ?? [];
    if (record.last_visited) lastVisited = record.last_visited;
  });

  return {
    id: userId,
    email,
    displayName: profile?.displayName ?? authDisplayName,
    progress,
    exerciseAttempts: await getExerciseAttempts(userId),
    lastVisited,
  };
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  });

  if (error) throw error;

  return {
    userId: data.user?.id ?? data.session?.user.id,
  };
}

export async function signUpWithPassword(
  email: string,
  password: string,
  displayName?: string
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
    options: displayName?.trim()
      ? {
          data: {
            display_name: displayName.trim(),
          },
        }
      : undefined,
  });

  if (error) throw error;

  return {
    user: data.user,
    session: data.session,
  };
}

export async function signOutAuth() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function upsertProfile(userId: string, email: string, displayName?: string) {
  await ensureUserRow(userId, email, displayName);
}

export async function updateUserDisplayName(userId: string, email: string, displayName: string) {
  const trimmedName = displayName.trim();

  if (!trimmedName) {
    throw new Error("Informe um nome de exibição.");
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      display_name: trimmedName,
    },
  });

  if (error) throw error;

  await tryEnsureUserRow(userId, email, trimmedName);
}

export async function requestEmailChange(email: string): Promise<AccountEmailChangeResult> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    throw new Error("Informe um e-mail válido.");
  }

  const { error } = await supabase.auth.updateUser({
    email: normalizedEmail,
  });

  if (error) throw error;

  return { email: normalizedEmail };
}

export async function updateAccountPassword(password: string) {
  if (password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}

export async function upsertModuleProgress(userId: string, moduleId: string, topicIds: string[]) {
  const { error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        module_id: moduleId,
        completed_topics: topicIds,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_id" }
    );

  if (error) throw error;
}

export async function updateLastVisited(userId: string, path: string) {
  const { error } = await supabase
    .from("user_progress")
    .update({ last_visited: path, updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  if (error && isMissingColumnError(error, "last_visited")) {
    console.warn("last_visited column is missing; skipping last visited update.");
    return;
  }

  if (error) throw error;
}

export async function recordExerciseAttempt(userId: string, attempt: ExerciseAttemptInput): Promise<ExerciseAttempt> {
  const attemptedAt = new Date().toISOString();
  const payload = createExerciseAttemptPayload(userId, attempt, attemptedAt);

  const { data, error } = await supabase
    .from("user_exercise_attempts")
    .insert(payload)
    .select(
      "id, module_id, topic_id, topic_name, exercise_id, exercise_title, question, selected_answer, selected_option, correct_answer, correct_option, is_correct, attempted_at"
    )
    .single<ExerciseAttemptRow>();

  if (error) {
    const localAttempt = {
      id: createLocalAttemptId(),
      ...attempt,
      attemptedAt,
    };

    storeExerciseAttemptLocally(userId, localAttempt);

    if (isMissingTableError(error, "user_exercise_attempts")) {
      console.warn("user_exercise_attempts table is missing; keeping exercise attempt in local browser storage.");
      return localAttempt;
    }

    console.warn("Could not save exercise attempt to Supabase; keeping it in local browser storage.", error);
    return localAttempt;
  }

  return mapExerciseAttempt(data);
}
