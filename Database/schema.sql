-- ============================================================================
-- The Invisible Cafeteria — Database Schema Specification
-- Compatible with PostgreSQL, SQLite, and MySQL
-- ============================================================================

-- 1. Users and RBAC Roles
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('cafeteria', 'ngo', 'admin')),
    email VARCHAR(128) UNIQUE NOT NULL,
    organization VARCHAR(128) NOT NULL,
    role_title VARCHAR(128) NOT NULL,
    phone_masked VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Food Batches & Surplus Management
CREATE TABLE IF NOT EXISTS food_batches (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    quantity_prepared DECIMAL(10, 2) NOT NULL CHECK (quantity_prepared >= 0),
    quantity_consumed DECIMAL(10, 2) NOT NULL CHECK (quantity_consumed >= 0),
    remaining_quantity DECIMAL(10, 2) NOT NULL,
    -- Auto-calculated surplus quantity: max(0, prepared - consumed)
    surplus_quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(32) NOT NULL DEFAULT 'kg',
    preparation_time VARCHAR(64) NOT NULL,
    safe_distribution_deadline VARCHAR(64) NOT NULL,
    storage_condition VARCHAR(64) NOT NULL,
    verified_safe BOOLEAN DEFAULT TRUE,
    notes TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Surplus Identified', 'Donated', 'Distributed')),
    logged_at VARCHAR(64) NOT NULL,
    logged_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Verified NGO Partners
CREATE TABLE IF NOT EXISTS ngo_partners (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    contact_person VARCHAR(128) NOT NULL,
    contact_phone_masked VARCHAR(64) NOT NULL,
    contact_email_masked VARCHAR(128) NOT NULL,
    address TEXT NOT NULL,
    distance_km DECIMAL(6, 2) NOT NULL,
    capacity_meals_per_day INT NOT NULL,
    active_pickups INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 5.00,
    verified_status BOOLEAN DEFAULT TRUE,
    cold_storage_vehicle BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Redistribution Donation Manifests
CREATE TABLE IF NOT EXISTS donations (
    id VARCHAR(64) PRIMARY KEY,
    food_batch_id VARCHAR(64) REFERENCES food_batches(id),
    food_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(32) NOT NULL,
    assigned_ngo_id VARCHAR(64) REFERENCES ngo_partners(id),
    assigned_ngo_name VARCHAR(255) NOT NULL,
    safe_deadline VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL CHECK (status IN (
        'Pending Assignment', 
        'Awaiting NGO Acceptance', 
        'Accepted', 
        'Declined', 
        'In Transit', 
        'Collected', 
        'Delivered'
    )),
    decline_reason TEXT,
    assigned_at VARCHAR(64) NOT NULL,
    accepted_at VARCHAR(64),
    collected_at VARCHAR(64),
    delivered_at VARCHAR(64),
    driver_name VARCHAR(128),
    driver_phone_masked VARCHAR(64),
    temperature_verified VARCHAR(64),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Constraint 5: Emergency Surge Mode & Vulnerability Allocations
CREATE TABLE IF NOT EXISTS emergency_scenarios (
    id VARCHAR(64) PRIMARY KEY,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    original_demand_meals INT NOT NULL,
    original_resource_meals INT NOT NULL,
    multiplier_demand DECIMAL(3, 1) NOT NULL DEFAULT 3.0,
    resource_factor DECIMAL(3, 2) NOT NULL DEFAULT 0.50,
    emergency_demand_meals INT GENERATED ALWAYS AS (original_demand_meals * 3) STORED,
    emergency_resource_meals INT GENERATED ALWAYS AS (original_resource_meals * 0.5) STORED,
    food_shortage_meals INT GENERATED ALWAYS AS (GREATEST(0, (original_demand_meals * 3) - (original_resource_meals * 0.5))) STORED,
    allocations_approved BOOLEAN DEFAULT FALSE,
    approved_by VARCHAR(128),
    declared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emergency_allocations (
    id VARCHAR(64) PRIMARY KEY,
    scenario_id VARCHAR(64) REFERENCES emergency_scenarios(id),
    recipient_group VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    priority_tier INT NOT NULL CHECK (priority_tier BETWEEN 1 AND 4),
    verified_headcount INT NOT NULL,
    normal_demand_meals INT NOT NULL,
    emergency_demand_meals INT NOT NULL,
    allocated_meals INT NOT NULL,
    fulfillment_rate DECIMAL(5, 2) NOT NULL,
    rationing_notes TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'Suggested' CHECK (status IN ('Suggested', 'Approved', 'Dispatched'))
);

-- 6. Constraint 7: Privacy Shield & Immutable Audit Trail
CREATE TABLE IF NOT EXISTS privacy_audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp VARCHAR(64) NOT NULL,
    operation VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL,
    details TEXT NOT NULL,
    cryptographic_hash VARCHAR(128) NOT NULL, -- SHA-256 fingerprint
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

