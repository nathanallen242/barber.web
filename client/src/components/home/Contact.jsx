import React, { useState } from 'react';

const Contact = React.forwardRef((props, ref) => {
    // State variable for form fields
    const [formFields, setFormFields] = useState({
        client_name: '',
        client_email: '',
        client_subject: '',
        client_message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Form data to be sent to the PHP script
        const formData = new FormData();
        for (const key in formFields) {
            formData.append(key, formFields[key]);
        }

        // Sending the form data to the PHP script
        const response = await fetch('mail.php', {
            method: 'POST',
            body: formData,
        });

        // Handling the response and setting the success message
        const result = await response.text();
        setSuccessMessage(result);

        // Clearing the form fields
        setFormFields({
            client_name: '',
            client_email: '',
            client_subject: '',
            client_message: '',
        });
    };

    return (
        <section ref={ref} className="mb-5 d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="container">
                <h1 className="contact-text h1-responsive font-weight-bold text-center my-4">Contact Us</h1>
                <p className="text-center w-50 mx-auto mb-1 fs-4">
                    Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                    a matter of hours to help you.
                </p>
                <div className="container d-flex justify-content-center">
                    <div className="col-md-7 py-2">
                        <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
                            <div className="form-container flex-column py-3">
                                <div className="md-form mb-3">
                                    <input type="text" id="client_name" name="client_name" className="form-control form-control-lg" placeholder="Your name" value={formFields.client_name} onChange={handleInputChange} />
                                </div>
                                <div className="md-form mb-3">
                                    <input type="text" id="client_email" name="client_email" className="form-control form-control-lg" placeholder="Your email" value={formFields.client_email} onChange={handleInputChange} />
                                </div>
                                <div className="md-form mb-3">
                                    <input type="text" id="client_subject" name="client_subject" className="form-control form-control-lg" placeholder="Subject" value={formFields.client_subject} onChange={handleInputChange} />
                                </div>
                                <div className="md-form mb-3">
                                    <textarea type="text" id="client_message" name="client_message" rows="4" className="form-control form-control-lg" placeholder="Your message" value={formFields.client_message} onChange={handleInputChange} />
                                </div>
                                <div className="text-center mt-2">
                                    <button className="btn btn-primary btn-lg font-weight-bold px-5" onClick={() => document.getElementById('contact-form').submit()}>Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Display success message */}
                {successMessage && <p>{successMessage}</p>}
            </div>
        </section>
    );
});

export default Contact;
