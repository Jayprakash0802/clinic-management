const API_BASE_URL = import.meta.env.VITE_API_URL||'http://localhost:5000';

const getToken = () => sessionStorage.getItem('token');

export async function signup(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Signup failed');
  return response.json();
}

export async function signin(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Signin failed');
  return response.json();
}

export async function getClinics() {
  const response = await fetch(`${API_BASE_URL}/clinics`);
  if (!response.ok) throw new Error('Failed to fetch clinics');
  return response.json();
}

export async function getAvailableDoctors(clinicId, timeSlot) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/appointments/available-doctors?clinicId=${clinicId}&timeSlot=${timeSlot}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
}

export async function bookAppointment(data) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to book appointment');
  return response.json();
}

export async function getPatientAppointments(patientId) {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/appointments/patients/${patientId}/appointments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
}
