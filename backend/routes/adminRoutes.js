const express = require('express');
const { auth, authAdmin } = require('../middlewares/auth'); 
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

const adminController = require('../controllers/adminController');

// Admin Registration route
router.post('/register', adminController.register);

// Admin Login route
router.post('/login', adminController.login);

// Admin Profile route
router.get('/profile', auth, adminController.getProfile); 

// Admin Upload route
router.post('/upload', authAdmin, upload.single('file'), adminController.upload);

// Admin Delete route
router.delete('/delete/:id', authAdmin, adminController.delete);

module.exports = router;
