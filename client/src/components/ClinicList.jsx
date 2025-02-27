import React, { useEffect, useState } from 'react';
import { getClinics } from '../services/api';

const ClinicList = ({ onSelectClinic }) => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    getClinics()
      .then((data) => setClinics(data))
      .catch((error) => console.error('Error fetching clinics:', error));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Select a Clinic</h2>
      {clinics.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No clinics available</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {clinics.map((clinic) => (
            <li key={clinic._id} style={{ marginBottom: '10px' }}>
              <button
                onClick={() => onSelectClinic(clinic)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {clinic.name} - {clinic.address}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClinicList;