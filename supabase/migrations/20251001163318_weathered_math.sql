/*
  # Add authorized user

  1. New Data
    - Insert authorized user with email and password
  
  2. Security
    - User can authenticate with these credentials
*/

INSERT INTO authorized_users (email, password, created_at)
VALUES ('kiriakosiwannidhs@gmail.com', '123456', now())
ON CONFLICT (email) DO NOTHING;