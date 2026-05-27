-- TextLab database setup for Supabase.
-- Run this script in the Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- User profile table. Supabase Auth user ids are UUID values.
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compatibility with older TextLab databases that used TEXT ids.
DO $$
BEGIN
  IF to_regclass('public.user_progress') IS NOT NULL THEN
    ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_user_id_fkey;
  END IF;

  IF to_regclass('public.user_exercise_attempts') IS NOT NULL THEN
    ALTER TABLE public.user_exercise_attempts DROP CONSTRAINT IF EXISTS user_exercise_attempts_user_id_fkey;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'id'
      AND data_type IN ('text', 'character varying')
  ) THEN
    ALTER TABLE public.users
      ALTER COLUMN id TYPE UUID USING id::uuid;
  END IF;
END $$;

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Auth already controls unique e-mails. Keeping this table unique by e-mail can
-- block test accounts recreated with the same address after deleting Auth users.
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_email_key;
DROP INDEX IF EXISTS public.users_email_key;

DELETE FROM public.users profile
WHERE NOT EXISTS (
  SELECT 1
  FROM auth.users auth_user
  WHERE auth_user.id = profile.id
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'users_id_fkey'
      AND conrelid = 'public.users'::regclass
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT users_id_fkey
      FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Progress table.
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  completed_topics TEXT[] DEFAULT '{}',
  last_visited TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS last_visited TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user_progress'
      AND column_name = 'user_id'
      AND data_type IN ('text', 'character varying')
  ) THEN
    ALTER TABLE public.user_progress
      ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
  END IF;

  DELETE FROM public.user_progress progress
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.users profile
    WHERE profile.id = progress.user_id
  );

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_progress_user_id_fkey'
      AND conrelid = 'public.user_progress'::regclass
  ) THEN
    ALTER TABLE public.user_progress
      ADD CONSTRAINT user_progress_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id
  ON public.user_progress(user_id);

-- Exercise attempts table for student analytics.
CREATE TABLE IF NOT EXISTS public.user_exercise_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  exercise_title TEXT NOT NULL,
  question TEXT NOT NULL,
  selected_answer INTEGER NOT NULL,
  selected_option TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,
  correct_option TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user_exercise_attempts'
      AND column_name = 'user_id'
      AND data_type IN ('text', 'character varying')
  ) THEN
    ALTER TABLE public.user_exercise_attempts
      ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
  END IF;

  DELETE FROM public.user_exercise_attempts attempt
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.users profile
    WHERE profile.id = attempt.user_id
  );

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_exercise_attempts_user_id_fkey'
      AND conrelid = 'public.user_exercise_attempts'::regclass
  ) THEN
    ALTER TABLE public.user_exercise_attempts
      ADD CONSTRAINT user_exercise_attempts_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_user_id
  ON public.user_exercise_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_module_id
  ON public.user_exercise_attempts(user_id, module_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_topic_id
  ON public.user_exercise_attempts(user_id, module_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_is_correct
  ON public.user_exercise_attempts(user_id, is_correct);

-- Row Level Security.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exercise_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view their own exercise attempts" ON public.user_exercise_attempts;
DROP POLICY IF EXISTS "Users can insert their own exercise attempts" ON public.user_exercise_attempts;
DROP POLICY IF EXISTS "Users can delete their own exercise attempts" ON public.user_exercise_attempts;

CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own progress" ON public.user_progress
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Users can view their own exercise attempts" ON public.user_exercise_attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own exercise attempts" ON public.user_exercise_attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own exercise attempts" ON public.user_exercise_attempts
  FOR DELETE USING (user_id = auth.uid());
