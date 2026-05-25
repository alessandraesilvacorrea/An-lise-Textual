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

-- Ativar Row Level Security (segurança)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Limpa políticas antigas caso já existam
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can delete their own progress" ON user_progress;

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
