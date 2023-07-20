const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController.js');

// Όλα τα ακίνητα
router.get('/', propertyController.getProperties);

// Εισαγωγή νέου ακινήτου
router.post('/', propertyController.createProperty);

// Εμφάνιση συγκεκριμένου ακινήτου βάση ID
router.get('/:id', propertyController.getProperty);

// Ενημέρωση συγκεκριμένου ακινήτου βάση ID
router.put('/:id', propertyController.updateProperty);

// Διαγραφή συγκεκριμένου ακινήτου βάση ID
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
