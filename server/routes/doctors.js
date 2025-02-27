// routes/doctors.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/clinics/:clinicId/doctors', doctorController.getDoctorsByClinic);

module.exports = router;
