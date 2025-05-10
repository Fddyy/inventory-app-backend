const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, barangController.searchBarang);


module.exports = router;
