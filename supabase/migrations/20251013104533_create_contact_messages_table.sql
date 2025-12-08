/*
  # Create Contact Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `first_name` (text) - Contact's first name
      - `last_name` (text) - Contact's last name
      - `email` (text) - Contact's email address
      - `project_type` (text) - Type of project selected
      - `message` (text) - Message content
      - `created_at` (timestamptz) - Timestamp when message was submitted
      - `read` (boolean) - Flag to mark if message has been read

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for authenticated users to insert messages (for the contact form)
    - Add policy for authorized users to read all messages (for admin panel)
    - Add policy for authorized users to update messages (to mark as read)

  3. Important Notes
    - Messages are stored securely with RLS enabled
    - Only authenticated users can submit messages
    - Only authorized admin users can view and manage messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to insert their own messages
CREATE POLICY "Authenticated users can insert messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authorized users to read all messages
CREATE POLICY "Authorized users can read all messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM authorized_users
      WHERE authorized_users.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Policy for authorized users to update messages
CREATE POLICY "Authorized users can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM authorized_users
      WHERE authorized_users.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM authorized_users
      WHERE authorized_users.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );