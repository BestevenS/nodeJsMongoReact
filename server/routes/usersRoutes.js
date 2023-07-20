const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Σύνδεση χρήστη
router.post('/login', userController.loginUser);

// Εγγραφή χρήστη
router.post('/register', userController.createUser);

// Προφίλ χρήστη
router.get('/profile', auth, userController.getUser);

// Ενημέρωση προφίλ χρήστη
router.put('/profile', auth, userController.updateUser);

// Λίστα όλων των χρηστών
router.get('/', userController.getUsers);

// Διαγραφή χρήστη
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
