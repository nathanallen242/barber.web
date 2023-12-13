import React, { useState } from 'react';
import ServiceSelection from '../components/appointment/Selection.jsx';
import BarberSelection from '../components/appointment/BarberSelection.jsx';
import BarberCalendar from '../components/appointment/BarberCalendar.jsx';
import ClientInfoForm from '../components/appointment/ClientInfoForm.jsx';
import AppointmentDataService from '../services/appointmentService.js';
import { useNavigate } from 'react-router-dom';
import { errorMessages, isFutureDate, isValidEmail, isValidPhoneNumber } from '../utils/validation.js';
import { TailSpin } from 'react-loader-spinner';
import { FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


function useAppointment() {
    // State for appointment details
    const [selectedService, setSelectedService] = useState('');
    const [selectedBarber, setSelectedBarber] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

    // State for client information
    const [clientInfo, setClientInfo] = useState({
        client_first_name: '',
        client_last_name: '',
        client_email: '',
        client_phone_number: '',
        preferred_location: '',
        other_location: ''
    });

    // Other states
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    // Appointment states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessCheckmark, setShowSuccessCheckmark] = useState(false);


    const navigate = useNavigate();  // React Router hook for navigation

    function toISOStringFormat(date, timeSlot) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        let [time, ampm] = timeSlot.split(' ');
        let [hour, minute] = time.split(':');
        
        hour = parseInt(hour);
        if (ampm === "PM" && hour !== 12) {
            hour += 12;
        } else if (ampm === "AM" && hour === 12) {
            hour = 0;
        }
    
        return `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${minute}:00-04:00`;
    }
    
    // ... All other functions from the AppointmentPage ...
    function formatDateTime(date, timeSlot) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        // Split time and AM/PM part
        let [time, ampm] = timeSlot.split(' ');
        let [hour, minute] = time.split(':');
        
        hour = parseInt(hour);
        if (ampm === 'PM' && hour !== 12) {
            hour += 12; // Convert to 24-hour format if it's PM
        }
        if (ampm === 'AM' && hour === 12) {
            hour = 0; // Convert to 24-hour format for midnight
        }
    
        const formattedStartTime = `${year}-${month}-${day} ${String(hour).padStart(2, '0')}:${minute}:00`;
        
        const dateObj = new Date(year, month - 1, day, hour, parseInt(minute));
        dateObj.setHours(dateObj.getHours() + 1);
        
        const endHour = String(dateObj.getHours()).padStart(2, '0');
        const endMinute = String(dateObj.getMinutes()).padStart(2, '0');
    
        const formattedEndTime = `${year}-${month}-${day} ${endHour}:${endMinute}:00`;
    
        return {
            startTime: formattedStartTime,
            endTime: formattedEndTime
        };
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo(prevState => ({ ...prevState, [name]: value }));

        if (errors[name]) {
            setErrors(prevState => ({ ...prevState, [name]: undefined }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};
    
        // Existing empty checks
        for (let field in errorMessages) {
            if (!clientInfo[field]) {
                tempErrors[field] = errorMessages[field];
            }
        }
    
        // Email validation
        if (clientInfo.client_email && !isValidEmail(clientInfo.client_email)) {
            tempErrors.client_email = "Invalid E-mail format";
        }
    
        // Phone number validation
        if (clientInfo.client_phone_number && !isValidPhoneNumber(clientInfo.client_phone_number)) {
            tempErrors.client_phone_number = "Invalid phone number format";
        }
    
        // Date-time check (assuming date-time is combined before this check)
        const { startTime } = formatDateTime(selectedDate, selectedTimeSlot);
        if (!isFutureDate(new Date(startTime))) {
            tempErrors.date_time = "Date and time must be in the future";
        }
    
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSelectionChange = (setter) => (value) => {
        setter(value);
    };

    const moveForward = () => {
        if (currentStep === 3 && (!selectedDate || !selectedTimeSlot)) {
            alert('Please select a date and time slot before proceeding.');
            return; 
        }
    
        const stepConditions = [
            selectedService,
            selectedBarber,
            selectedDate && selectedTimeSlot
        ];
    
        if (stepConditions[currentStep - 1]) {
            setCurrentStep(currentStep + 1);
        }
    };

    const submitForm = () => {
        if (validateForm()) {
            const confirmed = window.confirm("Are you sure you want to book this appointment?");
            if (!confirmed) return;
            if (selectedDate && selectedTimeSlot) {
                setIsSubmitting(true); // Start loading
                
                const { startTime, endTime } = formatDateTime(selectedDate, selectedTimeSlot);
                const eventStartTime = toISOStringFormat(selectedDate, selectedTimeSlot);
                const endTimeDate = new Date(new Date(eventStartTime).getTime() + 60*60*1000);
                const eventEndTime = endTimeDate.toISOString().slice(0, 19) + "-04:00";

                const appointmentData = {
                    date_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    client: clientInfo,
                    preferred_location: clientInfo.preferred_location || clientInfo.other_location,
                    employee_id: selectedBarber.employee_id,
                    start_time: startTime,
                    end_time_expected: endTime,
                };
                
                console.log(appointmentData)
                AppointmentDataService.create(appointmentData) // Using the service
                    .then(response => {
                        setIsSubmitting(false); // Stop loading
                        setShowSuccessCheckmark(true); // Show success checkmark

                        setTimeout(() => {
                            setShowSuccessCheckmark(false); // Hide checkmark after some time
                            setAppointmentConfirmed(true); // Proceed to showing appointment confirmed info

                            navigate('/callback', { 
                                state: {
                                    clientInfo, 
                                    selectedService,
                                    selectedBarber,
                                    eventStartTime,
                                    eventEndTime,
                                    appointmentConfirmed: true
                                }
                            });
                        }, 4000); // Adjust time as needed
                    })
                    .catch(error => {
                        console.error('Error creating appointment:', error.response.data);
                        setIsSubmitting(false); // Stop loading on error
                    });
            }
        }
    };

    const renderStepContent = () => {
        if (isSubmitting) {
            return (
                <div className="success-container">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            );
        }
    
        if (showSuccessCheckmark) {
            return (
                <div className="success-container">
                    <FaCheckCircle size={80} color="green" />
                </div>
            );
        }
        

        if (appointmentConfirmed) {
            return (
                <>
                    <div className="text-center alert alert-success">
                        Your appointment has been successfully confirmed!
                    </div>
                    <button className="btn btn-primary" onClick={() => { /* redirect or perform some action */ }}>
                        Go to Dashboard
                    </button>
                    <button className="btn btn-light" >
                        Add to Google Calendar
                    </button>
                </>
            );
        }
        switch (currentStep) {
            case 1:
                return (
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <ServiceSelection onServiceSelect={setSelectedService} initialValue={selectedService} />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <BarberSelection onBarberSelect={setSelectedBarber} initialValue={selectedBarber} />
                        </div>
                    </div>
                );
            case 3: 
                return (
                    <BarberCalendar 
                        selectedBarber={selectedBarber}
                        onDateSelect={handleSelectionChange(setSelectedDate)}
                        onTimeSlotSelect={handleSelectionChange(setSelectedTimeSlot)}
                        selectedDate={selectedDate}
                    />

                );
            case 4:
                return (
                    <>
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <h4 className="text-center">Enter your information:</h4>
                                <ClientInfoForm clientInfo={clientInfo} errors={errors} handleInputChange={handleInputChange} />
                                <div className="button-container">
                                    <button className="book-now-btn" onClick={submitForm}>Book Now</button>
                                </div>
                            </div>
                        </div>  
                    </>
                );
            default:
                return null;
        }
    };

    return {
        selectedService,
        setSelectedService,
        selectedBarber,
        setSelectedBarber,
        selectedDate,
        setSelectedDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        appointmentConfirmed,
        setAppointmentConfirmed,
        clientInfo,
        setClientInfo,
        renderStepContent,
        currentStep,
        setCurrentStep,
        errors,
        setErrors,
        handleInputChange,
        validateForm,
        handleSelectionChange,
        moveForward,
        submitForm,
    };
}

export default useAppointment;

