const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Route untuk login
router.post('/login', userController.login);

router.get('/getUser', authMiddleware, (req, res) => {
    res.json(req.user);
});
router.post('/logout', userController.logout)



module.exports = router;
