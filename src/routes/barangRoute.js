const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const authMiddleware = require('../middlewares/authMiddleware')

// Mengambil semua barang
router.get('/',authMiddleware, barangController.getAllBarang);

// Mengambil barang berdasarkan ID
router.get('/:id',authMiddleware, barangController.getBarangById);

// Menambahkan barang baru
router.post('/',authMiddleware, barangController.createBarang);

// Mengupdate barang berdasarkan ID
router.put('/:id',authMiddleware,barangController.updateBarang);

// Menghapus barang berdasarkan ID
router.delete('/:id',authMiddleware,barangController.deleteBarang);

module.exports = router;
