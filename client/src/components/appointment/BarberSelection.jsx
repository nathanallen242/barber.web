import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BarberSelection({ onBarberSelect, initialValue }) {
    const [barbers, setBarbers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/employees');
                
                if (response.data) {
                    setBarbers(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch employees (barbers)", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBarbers();

    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <label>Select a barber:</label>
            <select 
                value={initialValue ? initialValue.employee_id : ''}
                onChange={(e) => {
                    const selectedBarberId = e.target.value;
                    const selectedBarber = barbers.find(barber => barber.employee_id === parseInt(selectedBarberId));
                    console.log("Selected barber:", selectedBarber);
                    onBarberSelect(selectedBarber);
                }}
            >
                <option value="">Select...</option>
                {barbers.map(barber => (
                    <option key={barber.employee_id} value={barber.employee_id}>
                        {barber.first_name} {barber.last_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default BarberSelection;
