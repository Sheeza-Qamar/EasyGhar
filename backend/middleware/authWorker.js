const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'easyghar-default-secret';

const requireWorker = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = (auth && auth.startsWith('Bearer ') ? auth.slice(7) : '').trim();
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token required.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'worker') {
      return res.status(403).json({ success: false, message: 'Worker access only.' });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = { requireWorker };
