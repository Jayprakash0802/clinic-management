// controllers/authController.js
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { name, email, password, contact_info } = req.body;
  try {
    let patient = await Patient.findOne({ email });
    if (patient) return res.status(400).json({ error: 'Patient already exists' });

    patient = new Patient({ name, email, password, contact_info });
    await patient.save();

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, patient: { id: patient._id, name, email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await patient.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, patient: { id: patient._id, name: patient.name, email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signup, signin };
