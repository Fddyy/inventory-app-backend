const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Silakan login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(decoded)
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};

module.exports = authMiddleware;
