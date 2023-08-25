import React, { useEffect, useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
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
            window.location.href = '/appointments';
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
    <div>
      Initiating Google Authentication Process...
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
}

export default GoogleCallback;
