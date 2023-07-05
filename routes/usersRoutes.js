const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../middlewares/auth');

// Εγγραφή χρήστη
router.post('/register', userController.registerUser);

// Σύνδεση χρήστη
router.post('/login', userController.loginUser);

// Προφίλ χρήστη
router.get('/profile', userController.getUserProfile);

// Ενημέρωση προφίλ χρήστη
router.put('/profile', userController.updateUserProfile);

module.exports = router;
