// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');


async function bookAppointment(req, res) {
  const { patient_id, clinic_id, doctor_id, time_slot } = req.body;

  try {
    const now = new Date();
    const requestedTime = new Date(time_slot);

    if (requestedTime < now) {
      return res.status(400).json({ error: 'Cannot book past time slots' });
    }

    const existingPatientAppt = await Appointment.findOne({
      patient_id,
      time_slot: requestedTime,
      status: 'booked'
    });

    if (existingPatientAppt) {
      return res.status(400).json({ error: 'You already have an appointment at this time.' });
    }

    if (doctor_id) {
      const doctor = await Doctor.findById(doctor_id);
      if (!doctor || !doctor.clinics.includes(clinic_id)) {
        return res.status(400).json({ error: 'Doctor not available at this clinic' });
      }
      const isBooked = await Appointment.findOne({
        doctor_id,
        time_slot: requestedTime,
        status: 'booked'
      });
      if (isBooked) {
        return res.status(400).json({ error: 'This doctor is already booked at that time' });
      }
    } else {
      const doctors = await Doctor.find({ clinics: clinic_id });
      const bookedDoctors = await Appointment.find({
        time_slot: requestedTime,
        status: 'booked',
      }).distinct('doctor_id');

      const availableDoctor = doctors.find(doc => !bookedDoctors.includes(doc._id.toString()));
      if (!availableDoctor) {
        return res.status(400).json({ error: 'No doctors available for that time slot' });
      }
      req.body.doctor_id = availableDoctor._id;
    }

    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Time slot already booked for this doctor' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getPatientAppointments(req, res) {
  const { patientId } = req.params;
  try {
    const now = new Date();
    // Mark all past 'booked' appointments as 'completed'
    await Appointment.updateMany(
      { time_slot: { $lt: now }, status: 'booked' },
      { status: 'completed' }
    );

    const appointments = await Appointment.find({ patient_id: patientId })
      .populate('doctor_id clinic_id');
    res.json(appointments);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function getAvailableDoctors(req, res) {
  const { clinicId, timeSlot } = req.query;
  try {
    const now = new Date();
    const requestedTime = new Date(timeSlot);

    if (requestedTime && requestedTime < now) {
      return res.json([]);
    }

    const bookedDoctors = await Appointment.find({
      time_slot: requestedTime,
      status: 'booked',
    }).distinct('doctor_id');

    // All doctors in the clinic not in 'bookedDoctors'
    const doctors = await Doctor.find({
      clinics: clinicId,
      _id: { $nin: bookedDoctors },
    });
    res.json(doctors);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { bookAppointment, getPatientAppointments, getAvailableDoctors };
