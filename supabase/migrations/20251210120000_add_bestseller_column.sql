-- Add bestseller column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS bestseller BOOLEAN DEFAULT false;

-- Update the bestseller products based on the codes from the app
UPDATE products SET bestseller = true WHERE code IN (
  'GLXR-B201',
  'GLXR-B204',
  'GLXR-B212',
  'GLXR-B219',
  'GLXR-D404',
  'GLXR-D407',
  'GLXR-E504'
);
