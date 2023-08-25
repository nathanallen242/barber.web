import React from 'react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/admin/Login.jsx';
import Dashboard from './AdminDashboard.js';

const Admin = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
};

export default Admin;
