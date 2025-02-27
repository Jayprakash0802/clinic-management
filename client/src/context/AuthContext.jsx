import { createContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [patient, setPatient] = useState(() => {
    const storedPatient = sessionStorage.getItem('patient');
    return storedPatient ? JSON.parse(storedPatient) : null;
  });

  const [token, setToken] = useState(() => sessionStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedPatient = sessionStorage.getItem('patient');
      if (storedPatient) setPatient(JSON.parse(storedPatient));
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const res = await api.signin(credentials);
      if (res.patient) {
        const { token: authToken, patient: patientDetails } = res;

        setToken(authToken);
        setPatient(patientDetails);

        sessionStorage.setItem('token', authToken);
        sessionStorage.setItem('patient', JSON.stringify(patientDetails));

        navigate('/'); // Redirect after login
      } else {
        alert(res.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const signup = async (patientData) => {
    try {
      const res = await api.signup(patientData);
      if (res.patient) {
        const { token: authToken, patient: patientDetails } = res;

        setToken(authToken);
        setPatient(patientDetails);

        sessionStorage.setItem('token', authToken);
        sessionStorage.setItem('patient', JSON.stringify(patientDetails));

        navigate('/'); // Redirect after signup
      } else {
        alert(res.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  const logout = () => {
    setPatient(null);
    setToken(null);
    sessionStorage.clear();
    navigate('/login'); // Redirect after logout
  };

  const contextValue = useMemo(() => ({
    patient,
    token,
    login,
    signup,
    logout
  }), [patient, token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
