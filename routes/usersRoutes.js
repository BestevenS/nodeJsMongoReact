const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../middlewares/auth');

// Εγγραφή χρήστη
router.post('/register', userController.registerUser);

// Σύνδεση χρήστη
router.post('/login', userController.loginUser);

// Προφίλ χρήστη
router.get('/profile', auth, userController.getUserProfile);

// Ενημέρωση προφίλ χρήστη
router.put('/profile', auth, userController.updateUserProfile);

module.exports = router;
