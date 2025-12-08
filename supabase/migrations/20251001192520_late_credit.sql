/*
  # Add user type column to authorized_users table

  1. Changes
    - Add `type` column to `authorized_users` table
    - Set default value to 'user'
    - Allow values: 'user', 'admin'
    - Update existing user with specific ID to be admin

  2. Security
    - No RLS changes needed as existing policies cover the new column
*/

-- Add the type column with default value 'user'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'authorized_users' AND column_name = 'type'
  ) THEN
    ALTER TABLE authorized_users ADD COLUMN type text DEFAULT 'user' NOT NULL;
  END IF;
END $$;

-- Add a check constraint to ensure only valid types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'authorized_users_type_check'
  ) THEN
    ALTER TABLE authorized_users 
    ADD CONSTRAINT authorized_users_type_check 
    CHECK (type IN ('user', 'admin'));
  END IF;
END $$;

-- Update the specific user to be admin
UPDATE authorized_users 
SET type = 'admin' 
WHERE id = 'd58a8c39-fd03-4ec3-ae35-8eb119c2887c';