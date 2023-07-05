const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Όλα τα ακίνητα
router.get('/', propertyController.getAllProperties);

// Εισαγωγή νέου ακινήτου
router.post('/', propertyController.createProperty);

// Εμφάνιση συγκεκριμένου ακινήτου βάση ID
router.get('/:id', propertyController.getPropertyById);

// Ενημέρωση συγκεκριμένου ακινήτου βάση ID
router.put('/:id', propertyController.updatePropertyById);

// Διαγραφή συγκεκριμένου ακινήτου βάση ID
router.delete('/:id', propertyController.deletePropertyById);

module.exports = router;
