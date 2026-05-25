import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import type { ProgressState, UserData } from "../types/auth";

type UserProfileRow = {
  email: string | null;
  display_name: string | null;
};

type ProgressRow = {
  module_id: string;
  completed_topics: string[] | null;
  last_visited: string | null;
};

type UserDataFallback = {
  email?: string;
  displayName?: string;
};

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

function getDisplayNameFromAuthUser(user: User | null | undefined) {
  const displayName = user?.user_metadata?.display_name;
  return typeof displayName === "string" && displayName.trim() ? displayName.trim() : undefined;
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

  const email = normalizeEmail(profile?.email ?? authUser?.email ?? fallback.email ?? "");
  const authDisplayName = getDisplayNameFromAuthUser(authUser) ?? fallback.displayName;

  if (!email) return null;

  if (!profile && !profileReadFailed) {
    await ensureUserRow(userId, email, authDisplayName);
    profile = { email, displayName: authDisplayName };
  } else if (profile && !profile.displayName && authDisplayName) {
    await ensureUserRow(userId, email, authDisplayName);
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
