import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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

    const options = barbers.map(barber => ({
        value: barber.employee_id,
        label: `${barber.first_name} ${barber.last_name}`
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            '&:hover': { borderColor: '#888' }
        }),
        option: (provided) => ({
            ...provided,
            color: 'black', // Add other styles for options here
        }),
        // Add additional style overrides here
    };

    const handleChange = selectedOption => {
        onBarberSelect(barbers.find(barber => barber.employee_id === selectedOption.value));
        console.log("Selected barber:", selectedOption);
    };

    return (
        <div className="barber-selection-container">
            <label className="barber-selection-label">Select a barber:</label>
            <Select 
                styles={customStyles}
                options={options}
                onChange={handleChange}
                value={options.find(option => option.value === (initialValue ? initialValue.employee_id : ''))}
            />
        </div>
    );
}

export default BarberSelection;
