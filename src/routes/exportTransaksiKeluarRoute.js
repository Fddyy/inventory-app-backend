const express = require('express');
const router = express.Router();
const exportExcel = require('../utils/exportExcel');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth,exportExcel.exportTransaksiKeluarToExcel);

module.exports = router;
