import React from 'react';
import useAppointment from '../hooks/useAppointment.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppointmentPage() {
    const {
        currentStep,
        renderStepContent,
        moveForward, 
        setCurrentStep, 
        appointmentConfirmed,
    } = useAppointment();

    return (
        <>
        <div className="container mt-5">
            
            <h2 className='text-center'>Book an Appointment</h2>
            
            {/* Step content */}
            <div className="step-content">
                { renderStepContent() }
            </div>

            {/* Navigation buttons */}
            <div className="navigation-buttons mt-3 text-center">
                {currentStep > 1 && currentStep < 5 && !appointmentConfirmed && 
                    <button className="btn btn-secondary mr-2" onClick={() => setCurrentStep(currentStep - 1)}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                }
                {currentStep < 4 && 
                    <button className="btn btn-primary ml-2" onClick={moveForward}>
                        <i className="fas fa-arrow-right"></i>
                    </button>
                }
            </div>
        </div>
    </>
    );
}

export default AppointmentPage;
