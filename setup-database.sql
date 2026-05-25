-- Tabela de usuários (para rastrear quem fez login)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Garante compatibilidade com bancos criados por versoes antigas do projeto.
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Tabela de progresso (para salvar tópicos concluídos)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  completed_topics TEXT[] DEFAULT '{}',
  last_visited TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Garante compatibilidade com bancos criados por versoes antigas do projeto.
ALTER TABLE user_progress
  ADD COLUMN IF NOT EXISTS last_visited TEXT;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Tabela de tentativas de exercicios (para analytics do aluno)
CREATE TABLE IF NOT EXISTS user_exercise_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
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

CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_user_id ON user_exercise_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_module_id ON user_exercise_attempts(user_id, module_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_topic_id ON user_exercise_attempts(user_id, module_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_attempts_is_correct ON user_exercise_attempts(user_id, is_correct);

-- Ativar Row Level Security (segurança)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_attempts ENABLE ROW LEVEL SECURITY;

-- Limpa políticas antigas caso já existam
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can delete their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can view their own exercise attempts" ON user_exercise_attempts;
DROP POLICY IF EXISTS "Users can insert their own exercise attempts" ON user_exercise_attempts;
DROP POLICY IF EXISTS "Users can delete their own exercise attempts" ON user_exercise_attempts;

-- Políticas para permitir que cada usuário acesse seus próprios dados
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (id::text = auth.uid()::text);

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (id::text = auth.uid()::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (id::text = auth.uid()::text)
  WITH CHECK (id::text = auth.uid()::text);

CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (user_id::text = auth.uid()::text)
  WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can delete their own progress" ON user_progress
  FOR DELETE USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can view their own exercise attempts" ON user_exercise_attempts
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can insert their own exercise attempts" ON user_exercise_attempts
  FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can delete their own exercise attempts" ON user_exercise_attempts
  FOR DELETE USING (user_id::text = auth.uid()::text);
