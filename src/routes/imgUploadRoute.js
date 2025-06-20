const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadGambar } = require('../controllers/imgUploadController');

router.post('/', upload.single('image'), uploadGambar);

module.exports = router;
