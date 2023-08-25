import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CustomCalendar({ onDateClick, availableSlots, onSlotClick, selectedDate }) {
    const [selectedSlotValue, setSelectedSlotValue] = useState(null);

    const handleDateChange = (date) => {
        setSelectedSlotValue(null); // clear the selected slot on date change
        if (onDateClick) {
            onDateClick(date);
        }
        console.log('Selected date: ' + date);
    };

    const handleSlotClick = (slot) => {
        if (selectedSlotValue === slot) {
            setSelectedSlotValue(null);
            if (onSlotClick) {
                onSlotClick(null); // Notify parent component that slot has been deselected
            }
        } else {
            setSelectedSlotValue(slot);
            if (onSlotClick) {
                onSlotClick(slot); // Notify parent component of the selected slot
            }
            console.log('Selected slot: ' + slot);
        }
    };

    return (
        <div className="font-weight-500 justify-content-center">
            <h1 className="text-center font-weight-bold">React Calendar</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="calendar-container">
                        <Calendar onChange={handleDateChange} value={selectedDate} />
                    </div>
                </div>
                <div className="col-md-6 slots-container">
                    {availableSlots.length ? (
                        <ul className="list-group">
                            {availableSlots.map((slot) => (
                                <li 
                                    key={slot} 
                                    className={`list-group-item slot-item ${selectedSlotValue === slot ? 'selected-slot' : ''}`} 
                                    onClick={() => handleSlotClick(slot)}>
                                    {slot}
                                </li>
                            ))}
                        </ul>                      
                    ) : (
                        <p>No available slots for the selected date.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomCalendar;
