const express = require('express');
const router = express.Router();
const { authAdmin } = require('../middlewares/auth');

const path = require('path');

const propertyController = require('../controllers/propertyController');

// Require multer
const upload = require('../middlewares/uploadMiddleware');

// Get all properties
router.get('/', propertyController.getAllProperties);

// Create a new property
router.post('/', propertyController.createProperty);

// Get a specific property by id
router.get('/:id', propertyController.getPropertyById);

// Update a property by id
router.put('/:id', propertyController.updateProperty);

// Delete a property by id
router.delete('/:id', propertyController.deleteProperty);

// Upload a photo for a property
router.post('/:id/photos', authAdmin, upload.single('photo'), propertyController.uploadPhoto);

// Delete a photo for a property
router.delete('/:id/photos/:filename', authAdmin, propertyController.deletePhoto); // Προσθήκη αυτής της γραμμής


module.exports = router;
