const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { uploadBuffer } = require('../config/cloudinary');
const { requireWorker } = require('../middleware/authWorker');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.use(requireWorker);

// Helper: get worker id from req.userId
async function getWorkerId(userId) {
  const w = await db.queryOne('SELECT id FROM workers WHERE user_id = ?', [userId]);
  return w ? w.id : null;
}

// GET /api/worker/profile — full profile for logged-in worker
router.get('/profile', async (req, res) => {
  try {
    const workerId = await getWorkerId(req.userId);
    if (!workerId) {
      return res.status(404).json({ success: false, message: 'Worker profile not found.' });
    }
    const worker = await db.queryOne(
      `SELECT w.id, w.user_id, w.city_id, w.default_address, w.experience_years, w.bio,
              w.profile_photo_url, w.profile_photo_public_id, w.verification_status, w.created_at,
              u.full_name, u.phone, u.email,
              c.city_name
       FROM workers w
       JOIN users u ON w.user_id = u.id
       LEFT JOIN cities c ON w.city_id = c.id
       WHERE w.id = ?`,
      [workerId]
    );
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found.' });
    }
    const services = await db.query(
      `SELECT ws.id, ws.service_id, ws.minimum_charges, ws.hourly_rate, s.service_key, s.english_name
       FROM worker_services ws
       JOIN services s ON ws.service_id = s.id
       WHERE ws.worker_id = ?`,
      [workerId]
    );
    res.json({
      success: true,
      profile: {
        worker_id: worker.id,
        full_name: worker.full_name,
        email: worker.email || '',
        phone: worker.phone,
        city_id: worker.city_id,
        city_name: worker.city_name || '',
        default_address: worker.default_address || '',
        bio: worker.bio || '',
        profile_photo_url: worker.profile_photo_url,
        experience_years: worker.experience_years,
        verification_status: worker.verification_status,
      },
      services: services.map((s) => ({
        id: s.id,
        service_id: s.service_id,
        service_key: s.service_key,
        name: s.english_name,
        minimum_charges: parseFloat(s.minimum_charges) || 0,
        hourly_rate: parseFloat(s.hourly_rate) || 0,
      })),
    });
  } catch (err) {
    console.error('Worker profile GET error:', err);
    res.status(500).json({ success: false, message: 'Failed to load profile.' });
  }
});

// PATCH /api/worker/profile — update profile (optional multipart for profile photo)
router.patch('/profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const workerId = await getWorkerId(req.userId);
    if (!workerId) {
      return res.status(404).json({ success: false, message: 'Worker profile not found.' });
    }
    const body = req.body || {};
    const fullName = (body.full_name || body.fullName || '').trim();
    const email = (body.email || '').trim() || null;
    const phone = (body.phone || '').trim();
    const cityId = body.city_id != null ? parseInt(body.city_id, 10) : null;
    const defaultAddress = (body.default_address || body.defaultAddress || '').trim() || null;
    const bio = (body.bio || '').trim() || null;

    const worker = await db.queryOne('SELECT user_id, profile_photo_public_id FROM workers WHERE id = ?', [workerId]);
    if (!worker) return res.status(404).json({ success: false, message: 'Worker not found.' });

    if (fullName) {
      await db.query('UPDATE users SET full_name = ? WHERE id = ?', [fullName, worker.user_id]);
    }
    if (phone) {
      const existing = await db.queryOne('SELECT id FROM users WHERE phone = ? AND id != ?', [phone, worker.user_id]);
      if (existing) {
        return res.status(400).json({ success: false, message: 'Phone number already in use.' });
      }
      await db.query('UPDATE users SET phone = ? WHERE id = ?', [phone, worker.user_id]);
    }
    await db.query('UPDATE users SET email = ? WHERE id = ?', [email, worker.user_id]);

    let profilePhotoUrl = null;
    let profilePhotoPublicId = null;
    if (req.file && req.file.buffer) {
      const result = await uploadBuffer(req.file.buffer, { resource_type: 'image' });
      profilePhotoUrl = result.secure_url;
      profilePhotoPublicId = result.public_id;
    }

    const updates = [];
    const params = [];
    if (defaultAddress !== undefined) {
      updates.push('default_address = ?');
      params.push(defaultAddress);
    }
    if (bio !== undefined) {
      updates.push('bio = ?');
      params.push(bio);
    }
    if (cityId !== null && cityId !== undefined) {
      updates.push('city_id = ?');
      params.push(cityId);
    }
    if (profilePhotoUrl) {
      updates.push('profile_photo_url = ?, profile_photo_public_id = ?');
      params.push(profilePhotoUrl, profilePhotoPublicId);
    }
    if (updates.length) {
      params.push(workerId);
      await db.query(`UPDATE workers SET ${updates.join(', ')} WHERE id = ?`, params);
    }

    res.json({ success: true, message: 'Profile updated.' });
  } catch (err) {
    console.error('Worker profile PATCH error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to update profile.' });
  }
});

// GET /api/worker/services-list — all available services (for "add service" dropdown)
router.get('/services-list', async (req, res) => {
  try {
    const list = await db.query(
      'SELECT id, service_key, english_name FROM services WHERE is_active = 1 ORDER BY english_name'
    );
    res.json({ success: true, services: list });
  } catch (err) {
    console.error('Worker services-list error:', err);
    res.status(500).json({ success: false, message: 'Failed to load services.' });
  }
});

// PUT /api/worker/services — replace worker's services (prices, add, remove)
// Body: { services: [ { service_id, minimum_charges, hourly_rate } ] } or [ { service_key, ... } ]
router.put('/services', async (req, res) => {
  try {
    const workerId = await getWorkerId(req.userId);
    if (!workerId) {
      return res.status(404).json({ success: false, message: 'Worker profile not found.' });
    }
    const list = Array.isArray(req.body.services) ? req.body.services : [];
    const pool = db.getPool();

    await pool.execute('DELETE FROM worker_services WHERE worker_id = ?', [workerId]);

    for (const item of list) {
      let serviceId = item.service_id;
      if (!serviceId && item.service_key) {
        const s = await db.queryOne('SELECT id FROM services WHERE service_key = ? AND is_active = 1', [item.service_key]);
        if (!s) continue;
        serviceId = s.id;
      }
      if (!serviceId) continue;
      const minCharges = parseFloat(item.minimum_charges) || 0;
      const hourlyRate = parseFloat(item.hourly_rate) || 0;
      await db.query(
        'INSERT INTO worker_services (worker_id, service_id, minimum_charges, hourly_rate) VALUES (?, ?, ?, ?)',
        [workerId, serviceId, minCharges, hourlyRate]
      );
    }

    res.json({ success: true, message: 'Services updated.' });
  } catch (err) {
    console.error('Worker services PUT error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to update services.' });
  }
});

module.exports = router;
