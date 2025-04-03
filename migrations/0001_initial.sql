-- Paper & Pen Company E-commerce Database Schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  name TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price REAL NOT NULL,
  sale_price REAL,
  sku TEXT UNIQUE,
  stock INTEGER DEFAULT 0,
  category_id INTEGER,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_featured BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  status TEXT DEFAULT 'pending',
  total REAL NOT NULL,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  shipping_address TEXT,
  phone TEXT,
  name TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points_earned INTEGER DEFAULT 0,
  points_used INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert default admin user
INSERT INTO users (email, name, is_admin) 
VALUES ('admin@paperandpen.om', 'Admin', TRUE);

-- Insert sample categories
INSERT INTO categories (name_en, name_ar, slug) VALUES 
('Paper', 'ورق', 'paper'),
('Pens', 'أقلام', 'pens'),
('Filing', 'حفظ الملفات', 'filing'),
('Office Supplies', 'لوازم مكتبية', 'office-supplies');

-- Insert sample partners
INSERT INTO partners (name_en, name_ar, description_en, description_ar, logo_url) VALUES
('Deli', 'ديلي', 'Leading stationery and office supplies manufacturer', 'شركة رائدة في تصنيع القرطاسية ومستلزمات المكاتب', '/images/partners/deli-logo.png'),
('Nusign', 'نوساين', 'Premium writing instruments and stationery', 'أدوات كتابة وقرطاسية فاخرة', '/images/partners/nusign-logo.png'),
('Dmast', 'دي ماست', 'High-quality office and school supplies', 'لوازم مكتبية ومدرسية عالية الجودة', '/images/partners/dmast-logo.png');
