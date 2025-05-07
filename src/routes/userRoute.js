const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route untuk login
router.post('/', userController.login);

module.exports = router;
