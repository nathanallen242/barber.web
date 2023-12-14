import React, { useEffect, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import api from '../../services/api.js';
import AppointmentContext from '../../contexts/AppointmentContext.js';

function GoogleCallback() {
  const { appointmentData } = useContext(AppointmentContext);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');

  useEffect(() => {
    // Making the API call asynchronous
    const fetchData = async () => {
      try {
        console.log(appointmentData)
        const response = await api.post('auth/google/callback', { code, appointmentData });
        // Handle success - redirect or show a success message
        if (response.status === 200) {
          // Timeout before re-directing to appointments page
          setTimeout(() => {
            window.location.href = '/';
          }, 5000); // 5-second delay
        }
      } catch (error) {
        // Handle error - show an error message
        console.log(error.response);
      }
    };

    fetchData(); // Calling the asynchronous function
  }, [code, appointmentData]);

  return (
    <div className="google-callback-container">
      <TailSpin
        height="100" /* Increased size */
        width="100"  /* Increased size */
        color="#4fa94d" /* Choose your color */
        ariaLabel="loading"
      />
      <div className="google-callback-text">
        Initiating Google Authentication Process...
      </div>
    </div>
  );
}

export default GoogleCallback;
