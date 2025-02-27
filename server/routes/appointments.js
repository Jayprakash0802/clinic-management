const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getPatientAppointments,
  getAvailableDoctors,
} = require('../controllers/appointmentController');

router.post('/', bookAppointment);
router.get('/patients/:patientId/appointments', getPatientAppointments);
router.get('/available-doctors', getAvailableDoctors);

module.exports = router;
