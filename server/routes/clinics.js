// routes/clinics.js
const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

router.get('/', clinicController.getClinics);

module.exports = router;
