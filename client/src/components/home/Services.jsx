import React from 'react';
import servicesData from './servicesData.js'; // Adjust path if needed

const Services = React.forwardRef((props, ref) => {
    return (
      <section ref={ref} className="section service" id="services" aria-label="services">
        <div className="container">
        <h2 className="h1 section-title text-center p-4">Our Services</h2>
          <p className="h5 section-text text-center fs-4">
          Experience exceptional barber services that elevate your style to new heights!
          </p>
          
          <div className="row">
            {servicesData.map((service, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="service-card">
                  <div className="card-icon">
                    {service.image ? 
                      <img src={service.image} alt={service.title} /> : 
                      <ion-icon name={service.icon}></ion-icon>
                    }
                  </div>
                  <h3 className="h3">
                    <a href = "#" className="card-title">{service.title}</a>
                  </h3>
                  <p className="h5 card-text">{service.description}</p>
                  <a className="card-btn" aria-label="more"></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
});

export default Services;
