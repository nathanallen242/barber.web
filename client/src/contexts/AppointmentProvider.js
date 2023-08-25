import React, { useState, useEffect } from 'react';
import AppointmentContext from './AppointmentContext';

export function AppointmentProvider({ children }) {
  const [appointmentData, setAppointmentData] = useState(() => {
    // Attempt to retrieve appointmentData from local storage, or default to an empty object
    const savedData = localStorage.getItem('appointmentData');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    // Update local storage with the appointmentData whenever it changes
    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
  }, [appointmentData]);

  return (
    <AppointmentContext.Provider value={{ appointmentData, setAppointmentData }}>
      {children}
    </AppointmentContext.Provider>
  );
}
