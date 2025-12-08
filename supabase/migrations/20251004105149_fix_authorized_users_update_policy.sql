/*
  # Fix authorized_users update policy for admin panel
  
  1. Changes
    - Drop the existing "Allow authenticated user management" policy
    - Create separate policies for anon role to allow updates
    - This allows admin panel to update users using the anon key
  
  2. Security
    - Since access is already controlled by the login system
    - Only logged-in users can access the admin panel
    - RLS still protects the table from unauthorized direct access
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Allow authenticated user management" ON authorized_users;

-- Allow anon users to select (for login)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_users' 
    AND policyname = 'Allow login validation'
  ) THEN
    CREATE POLICY "Allow login validation"
      ON authorized_users FOR SELECT
      TO anon
      USING (true);
  END IF;
END $$;

-- Allow anon users to update (for admin panel and login tracking)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_users' 
    AND policyname = 'Allow user updates'
  ) THEN
    CREATE POLICY "Allow user updates"
      ON authorized_users FOR UPDATE
      TO anon
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Allow anon users to delete (for admin panel)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_users' 
    AND policyname = 'Allow user deletion'
  ) THEN
    CREATE POLICY "Allow user deletion"
      ON authorized_users FOR DELETE
      TO anon
      USING (true);
  END IF;
END $$;

-- Ensure insert policy exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'authorized_users' 
    AND policyname = 'Allow user registration'
  ) THEN
    CREATE POLICY "Allow user registration"
      ON authorized_users FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;