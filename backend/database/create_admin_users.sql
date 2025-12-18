-- Helper script to create admin users
-- Run this in your Supabase SQL editor to create admin users

-- First, make sure the admin_users table exists (run admin_table.sql first)

-- Create admin user with email: admin@example.com, password: admin123
INSERT INTO admin_users (email, password_hash, name, role) 
VALUES (
    'admin@example.com', 
    '$2b$10$K7L/8Y4aFJ9fUZNHZrN5H.QH5Zw8dWw1y6q8s5Y3V7H2F3K6L9N8M', 
    'Admin User',
    'admin'
);

-- Create super admin user with email: superadmin@example.com, password: super123
INSERT INTO admin_users (email, password_hash, name, role) 
VALUES (
    'superadmin@example.com', 
    '$2b$10$J9L/5X2aFJ9fUZNHZrN5H.QH5Zw8dWw1y6q8s5Y3V7H2F3K6L9N8M', 
    'Super Admin',
    'superadmin'
);

-- Note: The password hashes above are examples. 
-- To generate actual password hashes, you can use the following Node.js code:
-- 
-- const bcrypt = require('bcryptjs');
-- const password = 'your_password_here';
-- const hash = await bcrypt.hash(password, 10);
-- console.log(hash);

-- Or use this helper query to generate hashes (if you have a hash function):
-- SELECT crypt('admin123', gen_salt('bf', 10)) as password_hash;