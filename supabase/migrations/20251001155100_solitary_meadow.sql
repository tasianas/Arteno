/*
  # Add password field to authorized_users table

  1. Changes
    - Add `password` column to `authorized_users` table
    - Set default value to empty string
    - Allow manual editing of password field

  2. Security
    - Password field is required for authentication
    - Can be manually edited through Supabase dashboard
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'authorized_users' AND column_name = 'password'
  ) THEN
    ALTER TABLE authorized_users ADD COLUMN password text NOT NULL DEFAULT '';
  END IF;
END $$;