const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fungsi untuk login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    
    if (!user) {
      return res.status(400).json({ message: 'User tidak ditemukan' });
    }

    const isPasswordValid = await User.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password salah' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
};
