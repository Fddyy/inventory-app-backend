const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const authMiddleware = require('../middlewares/authMiddleware');

// Mendapatkan semua transaksi
router.get('/', authMiddleware,transaksiController.getAllTransaksi);

// Mendapatkan transaksi berdasarkan ID
router.get('/:id', authMiddleware,transaksiController.getTransaksiById);

// Membuat transaksi baru
router.post('/', authMiddleware,transaksiController.createTransaksi);

module.exports = router;
