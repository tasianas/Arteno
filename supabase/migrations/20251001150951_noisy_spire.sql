/*
  # Create products table for ARTENO glass blocks

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `description` (text, product description)
      - `price` (decimal, product price)
      - `image_url` (text, product image URL)
      - `category` (text, product category)
      - `is_bestseller` (boolean, whether product is a bestseller)
      - `stock_quantity` (integer, available stock)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to products
    - Add policy for authenticated users to manage products

  3. Sample Data
    - Insert initial glass block products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'glass-blocks',
  is_bestseller boolean DEFAULT false,
  stock_quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage products
CREATE POLICY "Authenticated users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, is_bestseller, stock_quantity) VALUES
('Crystal Clear Glass Block', 'Premium transparent glass block perfect for modern architectural designs', 89.99, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', true, 150),
('Frosted Elegance Block', 'Sophisticated frosted finish that diffuses light beautifully', 94.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400', true, 120),
('Textured Wave Block', 'Unique wave pattern creates stunning visual effects', 99.99, 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400', true, 100),
('Colored Accent Block', 'Add a pop of color to your glass block installations', 104.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400', true, 80),
('Industrial Clear Block', 'Heavy-duty clear glass block for industrial applications', 79.99, 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', false, 200),
('Decorative Pattern Block', 'Intricate patterns for decorative installations', 119.99, 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400', false, 60),
('Privacy Frosted Block', 'Maximum privacy with elegant frosted finish', 89.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400', false, 140),
('Colored Blue Block', 'Beautiful blue tinted glass block', 109.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400', false, 90);