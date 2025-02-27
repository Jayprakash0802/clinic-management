// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  time_slot: { type: Date, required: true },
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
});

AppointmentSchema.index({ doctor_id: 1, time_slot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
