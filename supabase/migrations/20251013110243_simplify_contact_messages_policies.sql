/*
  # Simplify Contact Messages Policies
  
  1. Changes
    - Drop existing complex RLS policies that rely on Supabase Auth
    - Since this app uses custom authentication (not Supabase Auth), we'll handle authorization at the application layer
    - Keep RLS enabled but make policies simpler
    - Allow authenticated role to read and update messages (will be controlled at app level)
  
  2. Security
    - The application will verify user authorization before showing admin panel
    - Messages are public for insert (contact form)
    - Reading/updating requires authenticated connection
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authorized users can read all messages" ON contact_messages;
DROP POLICY IF EXISTS "Authorized users can update messages" ON contact_messages;

-- Create simpler policies that work with custom auth
-- Allow authenticated users to read messages (app will handle auth check)
CREATE POLICY "Authenticated users can read messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update messages
CREATE POLICY "Authenticated users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete messages
CREATE POLICY "Authenticated users can delete messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);