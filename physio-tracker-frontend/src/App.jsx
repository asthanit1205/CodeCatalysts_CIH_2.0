


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import SessionPage from './pages/SessionPage';
import PhysioDashboard from './pages/PhysioDashboard'; // ✅ Import PhysioDashboard



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/session/:exerciseId" element={<SessionPage />} />
        <Route path="/physio-dashboard" element={<PhysioDashboard />} /> {/* ✅ New Route */}
      </Routes>
    </Router>
  );
};

export default App;
