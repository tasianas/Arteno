/*
  # Create initial authorized user

  1. New Data
    - Insert initial user with email 'kiriakosiwannidhs@gmail.com' and password '123456'
  
  2. Security
    - Uses INSERT with ON CONFLICT to avoid duplicates
    - Bypasses RLS for this initial setup
*/

-- Temporarily disable RLS for this insert
ALTER TABLE authorized_users DISABLE ROW LEVEL SECURITY;

-- Insert the initial user
INSERT INTO authorized_users (email, password, created_at)
VALUES ('kiriakosiwannidhs@gmail.com', '123456', now())
ON CONFLICT (email) DO NOTHING;

-- Re-enable RLS
ALTER TABLE authorized_users ENABLE ROW LEVEL SECURITY;