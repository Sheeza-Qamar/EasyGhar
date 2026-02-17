-- =============================================================================
-- Easyghar Database Schema & Reference Data
-- Database: easyghar
-- Use: mysql -u USER -p easyghar < database/schema_easyghar.sql
-- =============================================================================

USE easyghar;

-- -----------------------------------------------------------------------------
-- CITIES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city_name VARCHAR(100) NOT NULL,
    city_name_urdu VARCHAR(100),
    province VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_city_name (city_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO cities (city_name, city_name_urdu, province, is_active) VALUES
('Karachi', 'کراچی', 'Sindh', TRUE),
('Lahore', 'لاہور', 'Punjab', TRUE),
('Islamabad', 'اسلام آباد', 'Islamabad', TRUE),
('Rawalpindi', 'راولپنڈی', 'Punjab', TRUE),
('Faisalabad', 'فیصل آباد', 'Punjab', TRUE),
('Multan', 'ملتان', 'Punjab', TRUE),
('Hyderabad', 'حیدرآباد', 'Sindh', TRUE),
('Peshawar', 'پشاور', 'Khyber Pakhtunkhwa', TRUE),
('Quetta', 'کوئٹہ', 'Balochistan', TRUE),
('Sialkot', 'سیالکوٹ', 'Punjab', TRUE),
('Gujranwala', 'گوجرانوالہ', 'Punjab', TRUE),
('Sargodha', 'سرگودھا', 'Punjab', TRUE),
('Bahawalpur', 'بہاولپور', 'Punjab', TRUE),
('Sukkur', 'سکھر', 'Sindh', TRUE),
('Mardan', 'مردان', 'Khyber Pakhtunkhwa', TRUE),
('Gujrat', 'گجرات', 'Punjab', TRUE),
('Abbottabad', 'ایبٹ آباد', 'Khyber Pakhtunkhwa', TRUE),
('Sheikhupura', 'شیخوپورہ', 'Punjab', TRUE),
('Larkana', 'لاڑکانہ', 'Sindh', TRUE),
('Rahim Yar Khan', 'رحمت یار خان', 'Punjab', TRUE)
ON DUPLICATE KEY UPDATE city_name = VALUES(city_name);

-- -----------------------------------------------------------------------------
-- SERVICES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_key VARCHAR(50) UNIQUE NOT NULL,
    english_name VARCHAR(255) NOT NULL,
    urdu_name VARCHAR(255) NOT NULL,
    icon VARCHAR(20) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_service_key (service_key),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO services (service_key, english_name, urdu_name, icon, is_active, display_order) VALUES
('plumbing', 'Plumbing', 'پلمبنگ', '🔧', TRUE, 1),
('electrical', 'Electrical', 'بجلی', '⚡', TRUE, 2),
('cleaning', 'Cleaning', 'صفائی', '✨', TRUE, 3),
('ac-service', 'AC Service', 'اے سی سروس', '❄️', TRUE, 4),
('painting', 'Painting', 'پینٹنگ', '🎨', TRUE, 5),
('carpentry', 'Carpentry', 'بڑھئی', '🪚', TRUE, 6),
('appliance-repair', 'Appliance Repair', 'آلات کی مرمت', '🔌', TRUE, 7),
('roofing', 'Roofing', 'چھت', '🏠', TRUE, 8),
('flooring', 'Flooring', 'فرش', '🪵', TRUE, 9),
('tiling', 'Tiling', 'ٹائیلنگ', '🧱', TRUE, 10),
('masonry', 'Masonry', 'راج', '🧱', TRUE, 11),
('welding', 'Welding', 'ویلڈنگ', '⚒️', TRUE, 12),
('locksmith', 'Locksmith', 'تالا ساز', '🔐', TRUE, 13),
('glass-repair', 'Glass Repair', 'شیشے کی مرمت', '🪟', TRUE, 14),
('upholstery', 'Upholstery', 'گدی سازی', '🛋️', TRUE, 15),
('gardening', 'Gardening', 'باغبانی', '🌳', TRUE, 16),
('landscaping', 'Landscaping', 'زمین کی تزئین', '🌿', TRUE, 17),
('pest-control', 'Pest Control', 'کیڑے مار', '🐛', TRUE, 18),
('waterproofing', 'Waterproofing', 'واٹر پروفنگ', '💧', TRUE, 19),
('furniture-assembly', 'Furniture Assembly', 'فرنیچر اسمبلی', '🪑', TRUE, 20),
('tv-mounting', 'TV Mounting', 'ٹی وی ماؤنٹنگ', '📺', TRUE, 21),
('curtain-installation', 'Curtain Installation', 'پردے لگانا', '🪟', TRUE, 22),
('blinds-installation', 'Blinds Installation', 'بلائنڈز لگانا', '🪟', TRUE, 23),
('wallpaper-installation', 'Wallpaper Installation', 'وال پیپر لگانا', '🖼️', TRUE, 24),
('door-installation', 'Door Installation', 'دروازہ لگانا', '🚪', TRUE, 25),
('window-installation', 'Window Installation', 'کھڑکی لگانا', '🪟', TRUE, 26),
('fence-installation', 'Fence Installation', 'باڑ لگانا', '🚧', TRUE, 27),
('gate-installation', 'Gate Installation', 'گیٹ لگانا', '🚪', TRUE, 28),
('cctv-installation', 'CCTV Installation', 'سی سی ٹی وی لگانا', '📹', TRUE, 29),
('security-system', 'Security System', 'سیکیورٹی سسٹم', '🔒', TRUE, 30),
('intercom-installation', 'Intercom Installation', 'انٹرکام لگانا', '📞', TRUE, 31),
('water-tank-cleaning', 'Water Tank Cleaning', 'پانی کے ٹینک کی صفائی', '💧', TRUE, 32),
('septic-tank-cleaning', 'Septic Tank Cleaning', 'سیپٹک ٹینک کی صفائی', '🚽', TRUE, 33),
('drain-cleaning', 'Drain Cleaning', 'نالی کی صفائی', '🚿', TRUE, 34),
('chimney-cleaning', 'Chimney Cleaning', 'چمنی کی صفائی', '🔥', TRUE, 35),
('carpet-cleaning', 'Carpet Cleaning', 'قالین کی صفائی', '🧹', TRUE, 36),
('sofa-cleaning', 'Sofa Cleaning', 'صوفے کی صفائی', '🛋️', TRUE, 37),
('mattress-cleaning', 'Mattress Cleaning', 'گدے کی صفائی', '🛏️', TRUE, 38),
('car-washing', 'Car Washing', 'گاڑی دھونا', '🚗', TRUE, 39),
('bike-washing', 'Bike Washing', 'موٹر سائیکل دھونا', '🏍️', TRUE, 40),
('bathroom-renovation', 'Bathroom Renovation', 'باتھ روم کی تجدید', '🚿', TRUE, 41),
('kitchen-renovation', 'Kitchen Renovation', 'باورچی خانے کی تجدید', '🍳', TRUE, 42),
('false-ceiling', 'False Ceiling', 'جھوٹی چھت', '🏛️', TRUE, 43),
('pop-work', 'POP Work', 'پوپ کا کام', '🏗️', TRUE, 44),
('marble-polishing', 'Marble Polishing', 'سنگ مرمر پالش', '💎', TRUE, 45),
('wood-polishing', 'Wood Polishing', 'لکڑی پالش', '🪵', TRUE, 46),
('floor-polishing', 'Floor Polishing', 'فرش پالش', '✨', TRUE, 47),
('car-painting', 'Car Painting', 'گاڑی پینٹنگ', '🚗', TRUE, 48),
('bike-painting', 'Bike Painting', 'موٹر سائیکل پینٹنگ', '🏍️', TRUE, 49),
('generator-service', 'Generator Service', 'جنریٹر سروس', '⚡', TRUE, 50),
('inverter-service', 'Inverter Service', 'انورٹر سروس', '🔋', TRUE, 51),
('solar-panel-installation', 'Solar Panel Installation', 'سولر پینل لگانا', '☀️', TRUE, 52),
('water-pump-repair', 'Water Pump Repair', 'پانی کے پمپ کی مرمت', '💧', TRUE, 53),
('motor-winding', 'Motor Winding', 'موٹر وائنڈنگ', '⚙️', TRUE, 54),
('bike-repair', 'Bike Repair', 'موٹر سائیکل کی مرمت', '🏍️', TRUE, 55),
('car-repair', 'Car Repair', 'گاڑی کی مرمت', '🚗', TRUE, 56),
('bicycle-repair', 'Bicycle Repair', 'سائیکل کی مرمت', '🚲', TRUE, 57)
ON DUPLICATE KEY UPDATE english_name = VALUES(english_name);

-- -----------------------------------------------------------------------------
-- USERS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    role ENUM('customer', 'worker') NOT NULL DEFAULT 'customer',
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- WORKERS (depends: users, cities)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    city_id INT NOT NULL,
    default_address TEXT NULL,
    experience_years INT DEFAULT 0,
    bio TEXT,
    profile_photo_url VARCHAR(500),
    profile_photo_public_id VARCHAR(255),
    banner_photo_url VARCHAR(500),
    banner_photo_public_id VARCHAR(255),
    cnic_number VARCHAR(20) UNIQUE,
    verification_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    verification_notes TEXT,
    verified_at TIMESTAMP NULL,
    account_status ENUM('active', 'suspended', 'blocked') DEFAULT 'active',
    suspension_reason TEXT,
    online_status ENUM('offline', 'online', 'busy') DEFAULT 'offline',
    current_lat DECIMAL(10, 8),
    current_lng DECIMAL(11, 8),
    last_location_update TIMESTAMP NULL,
    total_jobs_completed INT DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_earnings DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    INDEX idx_user_id (user_id),
    INDEX idx_city_id (city_id),
    INDEX idx_verification_status (verification_status),
    INDEX idx_account_status (account_status),
    INDEX idx_online_status (online_status),
    INDEX idx_cnic_number (cnic_number),
    INDEX idx_default_address (default_address(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- WORKER_SERVICES (depends: workers, services)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS worker_services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    worker_id INT NOT NULL,
    service_id INT NOT NULL,
    minimum_charges DECIMAL(10, 2) NOT NULL,
    hourly_rate DECIMAL(10, 2) NOT NULL,
    experience_years INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE KEY unique_worker_service (worker_id, service_id),
    INDEX idx_worker_id (worker_id),
    INDEX idx_service_id (service_id),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- WORKER_DOCUMENTS (depends: workers)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS worker_documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    worker_id INT NOT NULL,
    cnic_front_url VARCHAR(500),
    cnic_front_public_id VARCHAR(255),
    cnic_back_url VARCHAR(500),
    cnic_back_public_id VARCHAR(255),
    selfie_image_url VARCHAR(500),
    selfie_image_public_id VARCHAR(255),
    cnic_verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    selfie_verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
    INDEX idx_worker_id (worker_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- CUSTOMERS (optional; for customer signup)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    default_address TEXT,
    default_lat DECIMAL(10, 8),
    default_lng DECIMAL(11, 8),
    city_id INT NULL,
    total_bookings INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    INDEX idx_user_id (user_id),
    INDEX idx_city_id (city_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Useful checks (run manually)
-- -----------------------------------------------------------------------------
-- SELECT * FROM users;
-- SELECT * FROM customers;
-- SELECT * FROM workers;
-- SELECT * FROM services;
-- SELECT * FROM worker_services;
-- SELECT * FROM worker_documents;
-- SELECT * FROM cities;
