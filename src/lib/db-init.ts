import { supabase } from "./supabase";

export async function initializeDatabase() {
  try {
    // Criar tabela users (se não existir)
    const { error: usersError } = await supabase.rpc("exec", {
      query: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          display_name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    });

    if (usersError && usersError.message !== "function exec(json) does not exist") {
      console.warn("Users table creation:", usersError);
    }

    // Criar tabela user_progress (se não existir)
    const { error: progressError } = await supabase.rpc("exec", {
      query: `
        CREATE TABLE IF NOT EXISTS user_progress (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          module_id TEXT NOT NULL,
          completed_topics TEXT[] DEFAULT '{}',
          last_visited TEXT,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(user_id, module_id)
        );
      `,
    });

    if (progressError && progressError.message !== "function exec(json) does not exist") {
      console.warn("Progress table creation:", progressError);
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}
