const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Εγγραφή χρήστη
router.post('/users/register', userController.registerUser);

// Σύνδεση χρήστη
router.post('/users/login', userController.loginUser);

// Προφίλ χρήστη
router.get('/users/profile', userController.getUserProfile);

// Ενημέρωση προφίλ χρήστη
router.put('/users/profile', userController.updateUserProfile);

module.exports = router;
