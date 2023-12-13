import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomCalendar from '../../services/calendar.js';

function BarberCalendar({ selectedBarber, onDateSelect, onTimeSlotSelect }) {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [weeklyAvailability, setWeeklyAvailability] = useState([]);
    
    const [selectedDate, setSelectedDate] = useState(() => {
        const storedDate = localStorage.getItem('selectedDate');
        return storedDate ? new Date(storedDate) : null;
    });
    const [selectedSlot, setSelectedSlot] = useState(() => localStorage.getItem('selectedSlot'));

    useEffect(() => {
        localStorage.setItem('selectedBarber', JSON.stringify(selectedBarber));
        if (selectedDate) {
            localStorage.setItem('selectedDate', selectedDate.toISOString());
        }
        if (selectedSlot) {
            localStorage.setItem('selectedSlot', selectedSlot);
        }
    }, [selectedBarber, selectedDate, selectedSlot]);

    useEffect(() => {
        // Assuming `selectedBarber` is the currently selected barber object
        fetchWeeklyAvailability(selectedBarber.employee_id);
    }, [selectedBarber]);

    const fetchWeeklyAvailability = async (employeeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/schedules/weekly-availability/${employeeId}`);
            setWeeklyAvailability(response.data);
        } catch (error) {
            console.error("Failed to fetch weekly availability", error);
        }
    };

    const fetchAvailableSlotsForDate = async (date) => {
        if (onDateSelect) {
            onDateSelect(date);
        }

        setSelectedDate(date); // Store the selected date in state

        const dayOfWeek = date.getUTCDay() + 1;

        try {
            const response = await axios.get(`http://localhost:8080/api/schedules/${selectedBarber.employee_id}`);
            const schedules = response.data;
            const daySchedule = schedules.find(schedule => schedule.day_id === dayOfWeek);
            if (daySchedule) {
                setAvailableSlots(generateTimeBlocks(daySchedule.from_hour, daySchedule.to_hour));
            } else {
                setAvailableSlots([]);
            }
        } catch (error) {
            console.error("Failed to fetch available slots", error);
        }
    };

    const generateTimeBlocks = (fromHour, toHour) => {
        let start = new Date(`1970-01-01T${fromHour}Z`);
        const end = new Date(`1970-01-01T${toHour}Z`);
        const timeBlocks = [];

        while (start < end) {
            timeBlocks.push(start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            start.setMinutes(start.getMinutes() + 60);
        }
        return timeBlocks;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <CustomCalendar
                    weeklyAvailability={weeklyAvailability}
                    onDateClick={fetchAvailableSlotsForDate}
                    availableSlots={availableSlots}
                    onSlotClick={(slot) => {
                        setSelectedSlot(slot);
                        if(onTimeSlotSelect) {
                            onTimeSlotSelect(slot);
                        }
                    }}
                    selectedDate={selectedDate}
                />
                </div>
            </div>
        </div>
    );
}

export default BarberCalendar;
