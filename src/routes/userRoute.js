const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route untuk login
router.post('/login', userController.login);

router.post('/logout', userController.logout)

module.exports = router;
