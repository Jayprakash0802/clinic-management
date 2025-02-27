// models/Doctor.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  clinics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }],
});

module.exports = mongoose.model('Doctor', DoctorSchema);
