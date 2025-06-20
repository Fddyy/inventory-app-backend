const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/',authMiddleware, barangController.getAllBarang);

router.get('/new',authMiddleware, barangController.getNewBarang);

router.get('/:id',authMiddleware, barangController.getBarangById);

router.post('/',authMiddleware, barangController.createBarang);

router.put('/edit/:id',authMiddleware, barangController.updateBarang);

router.delete('/:id',authMiddleware,barangController.deleteBarang);

module.exports = router;
