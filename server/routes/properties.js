const express = require('express');
const router = express.Router();

const propertiesController = require('../controllers/propertiesController');

router.get('/', propertiesController.getAllProperties);

module.exports = router;
