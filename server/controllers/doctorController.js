// controllers/doctorController.js
const Doctor = require('../models/Doctor');

async function getDoctorsByClinic(req, res) {
  const { clinicId } = req.params;
  try {
    const doctors = await Doctor.find({ clinics: clinicId });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getDoctorsByClinic };
