/*
  # Fix RLS policies for authorized_users table

  1. Security Changes
    - Drop existing restrictive RLS policies
    - Add new policies to allow anonymous access for authentication
    - Enable INSERT access for user registration
    - Enable SELECT access for user login

  Note: These policies allow anonymous access which is necessary for custom authentication.
  In production, you may want to add additional security measures.
*/

-- Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Users can read own data" ON authorized_users;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON authorized_users;

-- Create policy to allow anonymous users to insert (register)
CREATE POLICY "Allow anonymous user registration"
  ON authorized_users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anonymous users to select (login)
CREATE POLICY "Allow anonymous user login"
  ON authorized_users
  FOR SELECT
  TO anon
  USING (true);

-- Also allow authenticated users full access
CREATE POLICY "Allow authenticated user access"
  ON authorized_users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);