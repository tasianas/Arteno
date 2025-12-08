/*
  # Allow Anonymous Contact Form Submissions

  1. Changes
    - Drop existing restrictive policy for inserting messages
    - Create new policy that allows anyone (including anonymous users) to submit contact messages
    
  2. Security
    - Contact forms should be accessible to public visitors
    - Only insertion is allowed for anonymous users
    - Reading and updating messages still requires admin authentication
*/

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Authenticated users can insert messages" ON contact_messages;

-- Create new policy that allows anyone to insert messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);