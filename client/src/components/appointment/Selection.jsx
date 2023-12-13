import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hairCut from './service_assets/hair-cut.jpg';
import cleanShaving from './service_assets/shave.jpg';
import beardTrimming from './service_assets/beard.jpg';

function ServiceSelection({ onServiceSelect, initialValue }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(initialValue);

    const serviceImageMap = {
        'Hair Cut': hairCut,
        'Clean Shaving': cleanShaving,
        'Beard Trimming': beardTrimming
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/services');
                if (response.data) {
                    setServices(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleServiceClick = (serviceName) => {
        setSelectedService(serviceName);
        onServiceSelect(serviceName);
    };

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
        <div className="services-center">
            <label>Select a service:</label>
            <p>Please click on a service image to select it.</p>
            <div className="services-grid">
                {services.map(service => (
                    <div 
                        key={service.service_id} 
                        className={`service-container ${selectedService === service.service_name ? 'selected' : ''}`} 
                        onClick={() => handleServiceClick(service.service_name)}
                    >
                        <img src={serviceImageMap[service.service_name]} alt={service.service_name} />
                        <span>{service.service_name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServiceSelection;
