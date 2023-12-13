import React, { useEffect, useState, useContext } from 'react';
import AppointmentContext from '../../contexts/AppointmentContext.js';
import { useLocation, useNavigate } from 'react-router-dom';  // <-- Import useLocation
import api from '../../services/api.js';

function Callback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setAppointmentData } = useContext(AppointmentContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

    function Modal({ isOpen, message, onClose }) {
        if (!isOpen) return null;
    
        return (
            <div className="modal-background">
                <div className="modal-content">
                    <span className="close-icon" onClick={onClose}>×</span> {/* Close Icon */}
                    <p>{message}</p>
                    
                    {/* Return to Homepage Button */}
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate('/')}
                    >
                        Return to Homepage
                    </button>
    
                    {/* Add to Google Calendar Button */}
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleAddToGoogleCalendar}
                    >
                        Add to Google Calendar
                    </button>
                </div>
            </div>
        );
    }
    
    function closeModal() {
        navigate('/');
    }

    // Extract appointment details and format them for Google Calendar
    const formatAppointmentForGoogle = () => {
        return {
            summary: location.state.selectedService + " with " + location.state.selectedBarber.last_name,
            location: location.state?.clientInfo?.preferred_location === "Other"
                ? location.state?.clientInfo?.other_location
                : location.state?.clientInfo?.preferred_location,
            description: 'Appointment for ' + location.state.selectedService + " with " + location.state.selectedBarber.last_name,
            start: {
                dateTime: location.state.eventStartTime,
                timeZone: 'America/New_York'
            },
            end: {
                dateTime: location.state.eventEndTime,
                timeZone: 'America/New_York'
            },
            attendees: [
                { 'email': location.state.clientInfo.client_email }
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 }
                ]
            }
        };
    };

    const handleAddToGoogleCalendar = async () => {
        const appointmentDetails = formatAppointmentForGoogle();
        setAppointmentData(appointmentDetails);
        try {
            const response = await api.get('auth/google');
            if (response.status === 200) {
                const { googleOAuthURL } = response.data;
                // Timeout before re-directing to OAuth URL
                window.location.href = googleOAuthURL; // Redirect to Google OAuth URL
            }
            else {
                console.error('Error: Unexpected response from server.');
            }
        } catch (error) {
            console.error('Error fetching the OAuth URL endpoint.', error);
        }
    };

    


    useEffect(() => {
        let timeoutId;
        
        if (!location.state || !location.state.clientInfo) {
            // Navigate the user back to the previous page or another route
            setModalMessage("Error: Missing appointment details.");
            setIsModalOpen(true);

            timeoutId = setTimeout(() => {
                navigate('/appointments');
            }, 3000);
        }
        setModalMessage("Success: Your appointment has been booked!");
        setAppointmentConfirmed(true);
        setIsModalOpen(true);

    }, [location, navigate]);

    return (
        <Modal isOpen={isModalOpen} message={modalMessage} />
    ); 
}

export default Callback;
