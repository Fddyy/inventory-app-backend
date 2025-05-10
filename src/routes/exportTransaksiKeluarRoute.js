const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportExcelController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth,exportController.exportTransaksiKeluarToExcel);

module.exports = router;
