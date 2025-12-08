/*
  # Add password field to authorized_users table

  1. Changes
    - Add `password` column to `authorized_users` table
    - Set default value to empty string
    - Make it non-nullable after adding default

  2. Security
    - Password field added for custom authentication
    - Maintains existing RLS policies
*/

-- Add password column to authorized_users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'authorized_users' AND column_name = 'password'
  ) THEN
    ALTER TABLE authorized_users ADD COLUMN password text DEFAULT '' NOT NULL;
  END IF;
END $$;