const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { uploadBuffer } = require('../config/cloudinary');
const multer = require('multer');

const JWT_SECRET = process.env.JWT_SECRET || 'easyghar-default-secret';
const JWT_OPTIONS = { expiresIn: '30d' };

// GET /api/auth/cities — list cities from DB (for signup/profile); no hardcoding
router.get('/cities', async (req, res) => {
  try {
    const rows = await db.query('SELECT id, city_name, city_name_urdu FROM cities WHERE is_active = 1 ORDER BY city_name');
    const cities = (rows || []).map((r) => ({
      id: r.id,
      city_name: r.city_name || '',
      city_name_urdu: r.city_name_urdu || r.cityNameUrdu || '',
    }));
    res.json({ success: true, cities });
  } catch (err) {
    console.error('Cities list error:', err);
    res.status(500).json({ success: false, message: 'Failed to load cities.' });
  }
});

// GET /api/auth/services — list services from DB (for worker signup); no hardcoding
router.get('/services', async (req, res) => {
  try {
    const rows = await db.query(
      'SELECT id, service_key, english_name, urdu_name, icon FROM services WHERE is_active = 1 ORDER BY display_order ASC, english_name ASC'
    );
    const services = (rows || []).map((r) => ({
      id: r.service_key,
      service_key: r.service_key || '',
      name: r.english_name || '',
      nameUrdu: r.urdu_name || '',
      icon: r.icon || '',
    }));
    res.json({ success: true, services });
  } catch (err) {
    console.error('Services list error:', err);
    res.status(500).json({ success: false, message: 'Failed to load services.' });
  }
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ----- Customer signup -----
router.post('/register/customer', async (req, res) => {
  try {
    const { fullName, phone, email, password, cityId, city, defaultAddress } = req.body;
    if (!fullName || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Full name, phone and password are required.' });
    }

    let resolvedCityId = cityId || null;
    if (!resolvedCityId && city && String(city).trim()) {
      const cityName = String(city).trim().toLowerCase();
      const cityRows = await db.query('SELECT id FROM cities WHERE LOWER(city_name) = ? AND is_active = 1', [cityName]);
      if (cityRows && cityRows[0]) resolvedCityId = cityRows[0].id;
    }

    const existingPhone = await db.query('SELECT id FROM users WHERE phone = ?', [phone]);
    if (existingPhone && existingPhone.length) {
      return res.status(400).json({ success: false, message: 'Phone number already registered.' });
    }

    if (email) {
      const existingEmail = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existingEmail && existingEmail.length) {
        return res.status(400).json({ success: false, message: 'Email already registered.' });
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [userResult] = await db.getPool().execute(
      `INSERT INTO users (phone, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, 'customer')`,
      [phone, email || null, passwordHash, fullName.trim()]
    );
    const userId = userResult.insertId;

    // Insert into customers if table exists (city_id optional)
    try {
      await db.query(
        `INSERT INTO customers (user_id, city_id, default_address) VALUES (?, ?, ?)`,
        [userId, resolvedCityId, defaultAddress || null]
      );
    } catch (e) {
      if (e.code !== 'ER_NO_SUCH_TABLE') throw e;
      // customers table missing - user still created
    }

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully.',
      user: { id: userId, phone, email: email || null, full_name: fullName, role: 'customer' },
    });
  } catch (err) {
    console.error('Customer signup error:', err);
    res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
});

// ----- Worker (service provider) signup -----
router.post('/register/worker', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'cnicFront', maxCount: 1 },
  { name: 'cnicBack', maxCount: 1 },
]), async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || {};
    const fullName = body.fullname || body.fullName;
    const phone = body.phone;
    const email = body.email || null;
    const password = body.password;
    const cnicNumber = body.cnic;
    const cityName = (body.city || '').trim().toLowerCase();
    const defaultAddress = body.defaultAddress || null;
    const experienceYears = parseInt(body.experience, 10) || 0;
    const bio = body.bio || null;

    if (!fullName || !phone || !password || !cnicNumber || !cityName) {
      return res.status(400).json({ success: false, message: 'Required fields: full name, phone, password, CNIC, city.' });
    }

    const existingPhone = await db.query('SELECT id FROM users WHERE phone = ?', [phone]);
    if (existingPhone && existingPhone.length) {
      return res.status(400).json({ success: false, message: 'Phone number already registered.' });
    }

    const cityRow = await db.query('SELECT id FROM cities WHERE LOWER(city_name) = ? AND is_active = 1', [cityName]);
    const cityId = cityRow && cityRow[0] ? cityRow[0].id : null;
    if (!cityId) {
      return res.status(400).json({ success: false, message: 'Invalid city selected.' });
    }

    let profilePhotoUrl = null;
    let profilePhotoPublicId = null;
    if (files.profilePicture && files.profilePicture[0] && files.profilePicture[0].buffer) {
      const result = await uploadBuffer(files.profilePicture[0].buffer, { resource_type: 'image' });
      profilePhotoUrl = result.secure_url;
      profilePhotoPublicId = result.public_id;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [userResult] = await db.getPool().execute(
      `INSERT INTO users (phone, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, 'worker')`,
      [phone, email, passwordHash, fullName]
    );
    const userId = userResult.insertId;

    const [workerResult] = await db.getPool().execute(
      `INSERT INTO workers (user_id, city_id, default_address, experience_years, bio, profile_photo_url, profile_photo_public_id, cnic_number) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, cityId, defaultAddress, experienceYears, bio, profilePhotoUrl, profilePhotoPublicId, cnicNumber]
    );
    const workerId = workerResult.insertId;

    // Worker services (service_key from frontend, we need service_id)
    const servicesJson = body.servicesData || body.servicePricing || '{}';
    let servicesData = {};
    try {
      servicesData = typeof servicesJson === 'string' ? JSON.parse(servicesJson) : servicesJson;
    } catch (_) {}

    const serviceKeys = Object.keys(servicesData);
    for (const serviceKey of serviceKeys) {
      const srv = await db.query('SELECT id FROM services WHERE service_key = ? AND is_active = 1', [serviceKey]);
      if (srv && srv[0]) {
        const pricing = servicesData[serviceKey] || {};
        const minCharges = parseFloat(pricing.minRate) || 0;
        const hourlyRate = parseFloat(pricing.hourlyRate) || 0;
        await db.query(
          `INSERT INTO worker_services (worker_id, service_id, minimum_charges, hourly_rate) VALUES (?, ?, ?, ?)`,
          [workerId, srv[0].id, minCharges, hourlyRate]
        );
      }
    }

    // Worker documents: CNIC front/back (and selfie if you add later)
    let cnicFrontUrl = null, cnicFrontPublicId = null;
    let cnicBackUrl = null, cnicBackPublicId = null;
    if (files.cnicFront && files.cnicFront[0] && files.cnicFront[0].buffer) {
      const r = await uploadBuffer(files.cnicFront[0].buffer, { resource_type: 'image' });
      cnicFrontUrl = r.secure_url;
      cnicFrontPublicId = r.public_id;
    }
    if (files.cnicBack && files.cnicBack[0] && files.cnicBack[0].buffer) {
      const r = await uploadBuffer(files.cnicBack[0].buffer, { resource_type: 'image' });
      cnicBackUrl = r.secure_url;
      cnicBackPublicId = r.public_id;
    }

    await db.query(
      `INSERT INTO worker_documents (worker_id, cnic_front_url, cnic_front_public_id, cnic_back_url, cnic_back_public_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [workerId, cnicFrontUrl, cnicFrontPublicId, cnicBackUrl, cnicBackPublicId]
    );

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. We will verify and activate your account soon.',
      user: { id: userId, phone, full_name: fullName, role: 'worker' },
      workerId,
    });
  } catch (err) {
    console.error('Worker signup error:', err);
    res.status(500).json({ success: false, message: err.message || 'Registration failed. Please try again.' });
  }
});

// ----- Sign in (login) -----
router.post('/login', async (req, res) => {
  try {
    const { phone, email, password } = req.body;
    const loginId = (phone && phone.trim()) || (email && email.trim());
    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Phone or email and password are required.' });
    }

    const byPhone = !!phone && !!phone.trim();
    const user = byPhone
      ? await db.queryOne('SELECT id, phone, email, password_hash, full_name, role, is_active FROM users WHERE phone = ?', [phone.trim()])
      : await db.queryOne('SELECT id, phone, email, password_hash, full_name, role, is_active FROM users WHERE email = ?', [email.trim()]);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid phone/email or password.' });
    }
    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'Account is deactivated. Contact support.' });
    }

    const valid = await bcrypt.compare(password, user.password_hash || '');
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid phone/email or password.' });
    }

    await db.query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    const { password_hash, is_active, ...safeUser } = user;
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, JWT_OPTIONS);
    res.json({
      success: true,
      message: 'Signed in successfully.',
      user: safeUser,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Sign in failed. Please try again.' });
  }
});

module.exports = router;
