const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { registerUser, loginUser, currentUser, logoutUser } = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', validateToken, currentUser);
router.post('/logout', logoutUser);

module.exports = router;