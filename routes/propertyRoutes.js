const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Όλα τα ακίνητα
router.get('/properties', propertyController.getAllProperties);

// Εισαγωγή νέου ακινήτου
router.post('/properties', propertyController.createProperty);

// Εμφάνιση συγκεκριμένου ακινήτου βάση ID
router.get('/properties/:id', propertyController.getPropertyById);

// Ενημέρωση συγκεκριμένου ακινήτου βάση ID
router.put('/properties/:id', propertyController.updatePropertyById);

// Διαγραφή συγκεκριμένου ακινήτου βάση ID
router.delete('/properties/:id', propertyController.deletePropertyById);

module.exports = router;
