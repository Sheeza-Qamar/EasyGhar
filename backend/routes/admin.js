const express = require('express');
const router = express.Router();
const db = require('../config/db');

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const requireAdmin = (req, res, next) => {
  if (!ADMIN_API_KEY) {
    return res.status(503).json({ success: false, message: 'Admin API not configured.' });
  }
  const auth = req.headers.authorization;
  const token = (auth && auth.startsWith('Bearer ') ? auth.slice(7) : '').trim();
  if (token !== String(ADMIN_API_KEY).trim()) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  next();
};

router.use(requireAdmin);

// GET /api/admin/workers?status=pending|approved|rejected|all
router.get('/workers', async (req, res) => {
  try {
    const status = req.query.status || 'all';
    let sql = `
      SELECT w.id, w.user_id, w.city_id, w.default_address, w.experience_years, w.bio,
             w.profile_photo_url, w.cnic_number, w.verification_status, w.verification_notes,
             w.verified_at, w.created_at,
             u.full_name, u.phone, u.email,
             c.city_name
      FROM workers w
      LEFT JOIN users u ON w.user_id = u.id
      LEFT JOIN cities c ON w.city_id = c.id
    `;
    const params = [];
    if (status !== 'all') {
      sql += ' WHERE w.verification_status = ?';
      params.push(status);
    }
    sql += ' ORDER BY w.created_at DESC';

    const workers = await db.query(sql, params);
    if (!workers.length) {
      return res.json({ success: true, workers: [] });
    }

    const workerIds = workers.map((w) => w.id);
    const placeholders = workerIds.map(() => '?').join(',');
    const [docs, servicesRows] = await Promise.all([
      db.query(
        `SELECT worker_id, cnic_front_url, cnic_back_url FROM worker_documents WHERE worker_id IN (${placeholders})`,
        workerIds
      ),
      db.query(
        `SELECT ws.worker_id, s.english_name, s.service_key, ws.minimum_charges, ws.hourly_rate
         FROM worker_services ws
         JOIN services s ON ws.service_id = s.id
         WHERE ws.worker_id IN (${placeholders})`,
        workerIds
      ),
    ]);

    const docsByWorker = {};
    docs.forEach((d) => {
      if (!docsByWorker[d.worker_id]) docsByWorker[d.worker_id] = {};
      docsByWorker[d.worker_id].cnic_front_url = d.cnic_front_url;
      docsByWorker[d.worker_id].cnic_back_url = d.cnic_back_url;
    });
    const servicesByWorker = {};
    servicesRows.forEach((s) => {
      if (!servicesByWorker[s.worker_id]) servicesByWorker[s.worker_id] = [];
      servicesByWorker[s.worker_id].push({
        name: s.english_name,
        key: s.service_key,
        minimum_charges: s.minimum_charges,
        hourly_rate: s.hourly_rate,
      });
    });

    const result = workers.map((w) => ({
      id: w.id,
      user_id: w.user_id,
      full_name: w.full_name,
      email: w.email,
      phone: w.phone,
      city_name: w.city_name,
      default_address: w.default_address,
      experience_years: w.experience_years,
      bio: w.bio,
      cnic_number: w.cnic_number,
      profile_photo_url: w.profile_photo_url,
      verification_status: w.verification_status,
      verification_notes: w.verification_notes,
      verified_at: w.verified_at,
      created_at: w.created_at,
      documents: docsByWorker[w.id] || {},
      services: servicesByWorker[w.id] || [],
    }));

    res.json({ success: true, workers: result });
  } catch (err) {
    console.error('Admin list workers error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch workers.' });
  }
});

// PATCH /api/admin/workers/:id/approve
router.patch('/workers/:id/approve', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { notes } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, message: 'Invalid worker id.' });
    }
    await db.query(
      `UPDATE workers SET verification_status = 'approved', verification_notes = ?, verified_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [notes || null, id]
    );
    res.json({ success: true, message: 'Worker approved.' });
  } catch (err) {
    console.error('Admin approve error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve.' });
  }
});

// PATCH /api/admin/workers/:id/reject
router.patch('/workers/:id/reject', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { notes } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, message: 'Invalid worker id.' });
    }
    await db.query(
      `UPDATE workers SET verification_status = 'rejected', verification_notes = ?, verified_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [notes || null, id]
    );
    res.json({ success: true, message: 'Worker rejected.' });
  } catch (err) {
    console.error('Admin reject error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject.' });
  }
});

module.exports = router;
