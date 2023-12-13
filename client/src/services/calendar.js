import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CustomCalendar({ onDateClick, availableSlots, onSlotClick, selectedDate, weeklyAvailability }) {
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

    const isDayUnavailable = (date) => {
        const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
        // Adjusting the dayOfWeek to match your day_id (assuming day_id 1 = Sunday, 2 = Monday, etc.)
        const dayId = dayOfWeek + 1;
        return !weeklyAvailability.includes(dayId);
    };

    return (
        <div className="font-weight-500 justify-content-center">
            <h1 className="text-center font-weight-bold">Calendar Availability</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="calendar-container">
                        <Calendar 
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={({ date, view }) =>
                        view === 'month' && isDayUnavailable(date) ? 'unavailable-day' : ''
                    } />
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
