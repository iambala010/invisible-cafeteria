-- ============================================================================
-- The Invisible Cafeteria — Realistic Seed Dataset
-- ============================================================================

-- 1. Demo Users
INSERT INTO users (id, name, role, email, organization, role_title, phone_masked) VALUES
('user_chef_01', 'Chef Marcus Vance', 'cafeteria', 'm.vance@campusdining.edu', 'Apex University Dining Service', 'Head Kitchen Manager & Production Lead', '+1 (555) •••-4819'),
('user_ngo_01', 'Elena Rostova', 'ngo', 'elena@cityharvestkitchen.org', 'City Harvest Community Kitchen', 'Regional Logistics Coordinator', '+1 (555) •••-7392'),
('user_admin_01', 'Dr. Aris Thorne', 'admin', 'a.thorne@apex.edu', 'University Central Administration', 'Director of Food Systems & Zero-Waste Sustainability', '+1 (555) •••-9120');

-- 2. NGO Partners
INSERT INTO ngo_partners (id, name, type, contact_person, contact_phone_masked, contact_email_masked, address, distance_km, capacity_meals_per_day, active_pickups, rating, verified_status, cold_storage_vehicle) VALUES
('ngo_01', 'City Harvest Community Kitchen', 'Community Kitchen', 'Elena Rostova', '+1 (555) 732-••••', 'coord••••@cityharvestkitchen.org', '144 Riverbank Road, Sector 4 (3.2 km)', 3.2, 450, 2, 4.9, TRUE, TRUE),
('ngo_02', 'Hope Youth & Veteran Shelter', 'Youth Shelter', 'Marcus Vance Jr.', '+1 (555) 819-••••', 'intake••••@hopeshelter.org', '89 Maple Avenue, Downtown (5.8 km)', 5.8, 280, 1, 4.8, TRUE, TRUE),
('ngo_03', 'Metro Food Bank & Mobile Pantry', 'Food Bank', 'Sarah Lin', '+1 (555) 902-••••', 'ops••••@metrofoodbank.org', '320 Industrial Blvd, East Gate (8.1 km)', 8.1, 850, 0, 5.0, TRUE, TRUE),
('ngo_04', 'Golden Age Community Care', 'Elderly Support', 'David K. O’Connor', '+1 (555) 441-••••', 'pantry••••@goldenagecare.org', '12 Blossom Lane, North District (4.5 km)', 4.5, 200, 1, 4.7, TRUE, FALSE);

-- 3. Initial Food Batches
INSERT INTO food_batches (id, name, category, quantity_prepared, quantity_consumed, remaining_quantity, surplus_quantity, unit, preparation_time, safe_distribution_deadline, storage_condition, status, logged_at, logged_by) VALUES
('food_101', 'Steamed Basmati Rice & Lentil Curry', 'Rice & Grains', 85, 62, 23, 23, 'kg', '11:15 AM (Today)', '04:30 PM (Today - in 3.5 hrs)', 'Hot Hold (65°C+)', 'Surplus Identified', '12:45 PM', 'Chef Marcus Vance'),
('food_102', 'Herb-Roasted Vegetable Pasta Alfredo', 'Main Course', 120, 95, 25, 25, 'portions', '11:30 AM (Today)', '05:00 PM (Today - in 4 hrs)', 'Hot Hold (65°C+)', 'Surplus Identified', '01:10 PM', 'Chef Marcus Vance'),
('food_103', 'Artisan Whole Wheat Flatbreads & Pita', 'Breads & Rotis', 200, 160, 40, 40, 'portions', '10:00 AM (Today)', '08:00 PM (Today - in 7 hrs)', 'Room Temperature', 'Surplus Identified', '01:25 PM', 'Sous Chef Priya Rao'),
('food_104', 'Chilled Fruit Salad & Yogurt Medley', 'Desserts & Fruits', 70, 68, 2, 2, 'portions', '08:30 AM (Today)', '02:00 PM (Today - in 1 hr)', 'Chilled (4°C)', 'Available', '09:00 AM', 'Priya Rao'),
('food_105', 'Country Lentil & Roasted Squash Stew', 'Soups & Snacks', 50, 22, 28, 28, 'kg', '11:45 AM (Today)', '06:00 PM (Today - in 5 hrs)', 'Hot Hold (65°C+)', 'Donated', '01:30 PM', 'Chef Marcus Vance'),
('food_106', 'Crispy Falafel Wraps with Tahini', 'Main Course', 110, 80, 30, 30, 'portions', '12:00 PM (Today)', '04:00 PM (Today - in 3 hrs)', 'Hot Hold (65°C+)', 'Donated', '01:40 PM', 'Chef Marcus Vance');

-- 4. Active Donations
INSERT INTO donations (id, food_batch_id, food_name, category, quantity, unit, assigned_ngo_id, assigned_ngo_name, safe_deadline, status, assigned_at, driver_name, temperature_verified, notes) VALUES
('don_201', 'food_105', 'Country Lentil & Roasted Squash Stew', 'Soups & Snacks', 28, 'kg', 'ngo_01', 'City Harvest Community Kitchen', '06:00 PM (Today)', 'Awaiting NGO Acceptance', '01:45 PM', NULL, NULL, 'Hot insulated packaging provided by dining team.'),
('don_202', 'food_106', 'Crispy Falafel Wraps with Tahini', 'Main Course', 30, 'portions', 'ngo_02', 'Hope Youth & Veteran Shelter', '04:00 PM (Today)', 'In Transit', '01:50 PM', 'Officer Terry Scott', '66.4°C (Verified Safe)', 'Driver dispatch confirmed via eco-van.');

