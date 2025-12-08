/*
  # Fix Product Images Bucket Policies

  1. Changes
    - Drop existing restrictive policies
    - Create new policies that allow public uploads
    - Keep public read access
  
  2. Security
    - Allow anyone to upload images (needed since we use custom auth, not Supabase Auth)
    - Allow anyone to delete images
    - Keep public read access for displaying images
*/

DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Anyone can upload product images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can update product images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'product-images');