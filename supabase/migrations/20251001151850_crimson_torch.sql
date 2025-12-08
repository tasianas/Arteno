/*
  # Insert Glass Block Products Data

  1. Products Data
    - Insert all glass block products with complete information
    - Categories: clear, frosted, colored, textured, specialty
    - Includes pricing, descriptions, and stock information
    - Sets bestseller flags for popular products

  2. Data Structure
    - 20+ different glass block products
    - Realistic pricing and descriptions
    - High-quality product images from Pexels
    - Proper categorization for filtering
*/

-- Insert all glass block products
INSERT INTO products (name, description, price, image_url, category, is_bestseller, stock_quantity) VALUES
-- Clear Glass Blocks
('Crystal Clear Block', 'Premium crystal clear glass block perfect for modern architectural designs. Allows maximum light transmission while maintaining privacy.', 24.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'clear', true, 150),
('Ultra Clear Premium', 'Ultra-clear glass block with minimal distortion. Ideal for high-end residential and commercial applications.', 32.50, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'clear', true, 120),
('Standard Clear Block', 'Standard clear glass block offering excellent light transmission and durability at an affordable price point.', 18.75, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'clear', false, 200),

-- Frosted Glass Blocks
('Satin Frost Block', 'Elegant satin frosted finish provides privacy while allowing soft light diffusion. Perfect for bathrooms and offices.', 28.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'frosted', true, 180),
('Heavy Frost Premium', 'Dense frosted texture for maximum privacy without compromising structural integrity.', 31.25, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'frosted', false, 95),
('Light Frost Block', 'Subtle frosted finish that maintains good light transmission while adding visual interest.', 26.50, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'frosted', true, 140),

-- Colored Glass Blocks
('Ocean Blue Block', 'Beautiful ocean blue tinted glass block that adds a calming atmosphere to any space.', 35.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'colored', true, 85),
('Emerald Green Block', 'Rich emerald green glass block perfect for creating stunning accent walls and decorative features.', 38.75, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'colored', false, 70),
('Amber Gold Block', 'Warm amber gold tinted glass block that creates a cozy, inviting atmosphere with golden light.', 42.50, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'colored', true, 60),
('Ruby Red Block', 'Striking ruby red glass block for bold architectural statements and dramatic lighting effects.', 45.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'colored', false, 45),

-- Textured Glass Blocks
('Wave Pattern Block', 'Dynamic wave pattern creates beautiful light refraction and adds movement to your walls.', 33.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'textured', true, 110),
('Diamond Cut Block', 'Precision diamond cut pattern provides exceptional light dispersion and visual appeal.', 39.25, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'textured', false, 80),
('Ripple Effect Block', 'Subtle ripple texture creates gentle light diffusion perfect for contemporary designs.', 29.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'textured', true, 125),
('Geometric Pattern Block', 'Modern geometric pattern adds architectural interest while maintaining functionality.', 36.50, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'textured', false, 90),

-- Specialty Glass Blocks
('Fire-Rated Block', 'Specially engineered fire-rated glass block meeting commercial building safety requirements.', 55.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'specialty', false, 40),
('Thermal Insulated Block', 'Advanced thermal insulation properties for energy-efficient building applications.', 48.75, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'specialty', true, 65),
('Security Glass Block', 'Reinforced security glass block designed for high-security applications and impact resistance.', 62.50, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'specialty', false, 30),
('Solar Control Block', 'Advanced solar control technology reduces heat gain while maintaining natural light.', 52.99, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'specialty', true, 55),

-- Premium Collection
('Architect Series Clear', 'Premium architect series with superior optical clarity and precision manufacturing.', 68.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'clear', true, 25),
('Designer Frost Elite', 'Elite designer frosted block with custom texture patterns for luxury applications.', 72.50, 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg', 'frosted', false, 20),
('Artisan Colored Block', 'Hand-crafted artisan colored glass block with unique color variations and premium finish.', 85.99, 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg', 'colored', true, 15);