const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');

// Mendapatkan semua transaksi
router.get('/', transaksiController.getAllTransaksi);

// Mendapatkan transaksi berdasarkan ID
router.get('/:id', transaksiController.getTransaksiById);

// Membuat transaksi baru
router.post('/', transaksiController.createTransaksi);

module.exports = router;
