import React, { useState } from 'react';
import ClinicList from './ClinicList';
import AppointmentForm from './AppointmentForm';
import PatientAppointments from './PatientAppointments';

function Dashboard({ patient }) {
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [refreshAppointments, setRefreshAppointments] = useState(false);

    const handleBack = () => {
        setSelectedClinic(null);
    };

    const handleAppointmentBooked = () => {
        setRefreshAppointments((prev) => !prev); // Toggle to trigger useEffect in PatientAppointments
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Appointment Booking Dashboard</h1>
            {!selectedClinic ? (
                <ClinicList onSelectClinic={setSelectedClinic} />
            ) : (
                <AppointmentForm clinic={selectedClinic} patientId={patient.id} onBack={handleBack} onAppointmentBooked={handleAppointmentBooked} />
            )}
            {patient && <PatientAppointments patientId={patient.id} refresh={refreshAppointments} />}
            <button
                onClick={() => {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('patient');
                    window.location.href = '/login'; // Logout and redirect
                }}
                style={{
                    display: 'block',
                    margin: '20px auto',
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;