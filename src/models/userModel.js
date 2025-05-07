const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Fungsi untuk mencari user berdasarkan email
exports.findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};


// Fungsi untuk memverifikasi password
exports.verifyPassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};