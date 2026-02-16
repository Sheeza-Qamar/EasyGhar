const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * GET /api/browse/services
 * Public: list all service offerings from approved workers (for customer Browse Services page).
 * Returns one item per worker+service combination.
 */
router.get('/services', async (req, res) => {
  try {
    const rows = await db.query(
      `SELECT
        ws.id AS offering_id,
        w.id AS worker_id,
        u.full_name AS provider_name,
        c.city_name AS location,
        w.bio,
        w.experience_years AS worker_experience_years,
        w.profile_photo_url,
        w.total_jobs_completed AS jobs,
        w.total_reviews AS reviews,
        COALESCE(w.average_rating, 0) AS rating,
        s.id AS service_id,
        s.service_key,
        s.english_name AS service_name,
        s.english_name AS type,
        s.icon,
        ws.minimum_charges AS price,
        ws.hourly_rate
       FROM worker_services ws
       JOIN workers w ON w.id = ws.worker_id
       JOIN users u ON u.id = w.user_id
       LEFT JOIN cities c ON c.id = w.city_id
       JOIN services s ON s.id = ws.service_id
       WHERE w.verification_status = 'approved'
         AND w.account_status = 'active'
         AND ws.is_active = 1
         AND s.is_active = 1
       ORDER BY w.id, s.english_name`
    );

    const services = (rows || []).map((r) => {
      const name = (r.provider_name || '').trim();
      const initials = name
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || '—';
      return {
        id: r.offering_id,
        name: r.service_name || '',
        type: r.type || r.service_name || '',
        workerId: r.worker_id,
        provider: r.provider_name || '',
        initials,
        location: r.location || '',
        price: parseFloat(r.price) || 0,
        rating: parseFloat(r.rating) || 0,
        reviews: parseInt(r.reviews, 10) || 0,
        experience: `${r.worker_experience_years != null ? r.worker_experience_years : 0} years`,
        jobs: parseInt(r.jobs, 10) || 0,
        icon: r.icon || '🔧',
        bio: r.bio || '',
        service: r.service_name || '',
        profile_photo_url: r.profile_photo_url || null,
      };
    });

    res.json({ success: true, services });
  } catch (err) {
    console.error('Browse services error:', err);
    res.status(500).json({ success: false, message: 'Failed to load services.', services: [] });
  }
});

module.exports = router;
