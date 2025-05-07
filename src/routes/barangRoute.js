const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');

// Mengambil semua barang
router.get('/', barangController.getAllBarang);

// Mengambil barang berdasarkan ID
router.get('/:id', barangController.getBarangById);

// Menambahkan barang baru
router.post('/', barangController.createBarang);

// Mengupdate barang berdasarkan ID
router.put('/:id', barangController.updateBarang);

// Menghapus barang berdasarkan ID
router.delete('/:id', barangController.deleteBarang);

module.exports = router;
