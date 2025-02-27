// controllers/clinicController.js
const Clinic = require('../models/Clinic');

async function getClinics(req, res) {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getClinics };
