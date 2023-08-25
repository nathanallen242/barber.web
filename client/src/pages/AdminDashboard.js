import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/admin/data/NavBar';
import Stats from '../components/admin/data/Stats';
import Graphics from '../components/admin/data/Graphics';
import Users from '../components/admin/data/Users';
import Configuration from '../components/admin/data/Configuration';
import { Routes, Route } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/admin/dashboard') {
      navigate('/admin/dashboard/statistics');
    }
  }, [location, navigate]);

  return (
    <>
      <NavBar />
      <div className="admin-content">
        <Routes>
          <Route path="/statistics" element={<Stats />} />
          <Route path="/charts" element={<Graphics />} />
          <Route path="/clients" element={<Users />} />
          <Route path="/config" element={<Configuration />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
