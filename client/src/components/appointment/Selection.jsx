import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ServiceSelection({ onServiceSelect, initialValue }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/services');
                if (response.data) {
                    setServices(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
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
            <label>Select a service:</label>
            <select 
                value={initialValue}
                onChange={(e) => {
                    const selectedService = e.target.value;
                    console.log("Selected service:", selectedService);
                    onServiceSelect(selectedService);
                }}
            >
                <option value="">Select...</option>
                {services.map(service => (
                    <option key={service.service_id} value={service.service_name}>
                        {service.service_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ServiceSelection;
