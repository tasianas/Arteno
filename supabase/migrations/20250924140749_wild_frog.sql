/*
  # Setup authorized users for ARTENO website

  1. Security
    - This migration sets up the authorized users who can access the website
    - Users will be created in Supabase Auth with specific credentials
    - Only these users will be able to sign in and access the site

  2. Users to be created
    - kirakosiwannidhs@gmail.com
    - info@kpoffice.gr
    - hello@ateno.studio
    - hello@georgiosapostolopoulos.com
    - info@rctech.gr
    - info@p4architecture.com
    - info@spyridonarchitecture.com
    - info@d-p-arch.com
    - t@thanasis.ca
    - info@nominalarchitects.com
    - info@pointsupreme.com
*/

-- Note: User creation will be handled through the Supabase Auth API
-- This migration file serves as documentation of the authorized users
-- The actual user creation will be done via the application code

-- Create a table to track authorized users (optional, for reference)
CREATE TABLE IF NOT EXISTS authorized_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE authorized_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read their own data
CREATE POLICY "Users can read own data"
  ON authorized_users
  FOR SELECT
  TO authenticated
  USING (auth.email() = email);

-- Insert the authorized email addresses for reference
INSERT INTO authorized_users (email) VALUES
  ('kirakosiwannidhs@gmail.com'),
  ('info@kpoffice.gr'),
  ('hello@ateno.studio'),
  ('hello@georgiosapostolopoulos.com'),
  ('info@rctech.gr'),
  ('info@p4architecture.com'),
  ('info@spyridonarchitecture.com'),
  ('info@d-p-arch.com'),
  ('t@thanasis.ca'),
  ('info@nominalarchitects.com'),
  ('info@pointsupreme.com')
ON CONFLICT (email) DO NOTHING;