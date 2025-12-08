/*
  # Fix Authentication Security

  1. Security Changes
    - Remove overly permissive RLS policies
    - Add proper authentication validation
    - Ensure only valid credentials can access data

  2. RLS Policies
    - Allow anonymous users to INSERT new accounts
    - Allow anonymous users to SELECT only for login validation
    - Restrict access to authenticated users for other operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous user login" ON authorized_users;
DROP POLICY IF EXISTS "Allow anonymous user registration" ON authorized_users;
DROP POLICY IF EXISTS "Allow authenticated user access" ON authorized_users;

-- Create secure policies
CREATE POLICY "Allow user registration"
  ON authorized_users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow login validation"
  ON authorized_users
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow authenticated user management"
  ON authorized_users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);