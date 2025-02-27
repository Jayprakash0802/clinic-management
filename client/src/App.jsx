import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token, patient } = useContext(AuthContext);

  useEffect(() => {
    if (token && !patient) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('patient');
    }
  }, [token, patient]);

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <AuthForm />} />
      <Route path="/" element={token ? <Dashboard patient={patient} /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
