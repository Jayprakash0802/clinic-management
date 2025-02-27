import React, { useState, useEffect } from 'react';
import { getPatientAppointments } from '../services/api';

function PatientAppointments({ patientId, refresh }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (patientId) {
      getPatientAppointments(patientId).then(setAppointments).catch(console.error);
    }
  }, [patientId, refresh]);

  return (
    <div>
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              Clinic: {appointment.clinic_id.name}, Doctor: {appointment.doctor_id.name},
              Time: {new Date(appointment.time_slot).toLocaleString()}, Status: {appointment.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientAppointments;