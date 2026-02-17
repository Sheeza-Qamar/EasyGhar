-- =============================================================================
-- Easyghar: Bookings & Live Tracking Tables
-- Run on existing DB: mysql -u USER -p easyghar < backend/database/add_bookings_tables.sql
-- Or copy-paste in MySQL Workbench / phpMyAdmin (use easyghar database first).
-- =============================================================================

USE easyghar;

-- -----------------------------------------------------------------------------
-- BOOKINGS (depends: customers, workers, services)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    worker_id INT NOT NULL,
    service_id INT NOT NULL,
    description TEXT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'ongoing', 'completed', 'cancelled') DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    commission_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    completed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    cancellation_reason TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_worker_id (worker_id),
    INDEX idx_service_id (service_id),
    INDEX idx_status (status),
    INDEX idx_booking_date (booking_date),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- TRACKING_SESSIONS (live location log per booking)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tracking_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    customer_lat DECIMAL(10, 8) NULL,
    customer_lng DECIMAL(11, 8) NULL,
    worker_lat DECIMAL(10, 8) NULL,
    worker_lng DECIMAL(11, 8) NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking_timestamp (booking_id, recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Optional: useful queries (run manually when needed)
-- -----------------------------------------------------------------------------
-- SELECT * FROM bookings ORDER BY created_at DESC;
-- SELECT * FROM tracking_sessions WHERE booking_id = ? ORDER BY recorded_at DESC;
