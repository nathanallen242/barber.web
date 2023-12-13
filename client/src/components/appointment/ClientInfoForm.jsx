import React, { Fragment, useState } from 'react';

function InputField({
    type,
    id,
    value,
    onChange,
    name,
    label,
    error
}) {
    return (
        <div className="form-outline mb-4">
            <input 
                type={type}
                id={id}
                className="form-control"
                value={value}
                onChange={onChange}
                name={name}
            />
            <label className="form-label" htmlFor={id}>{label}</label>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

function ClientInfoForm({ clientInfo, errors, handleInputChange }) {
    const [preferredLocation, setPreferredLocation] = useState('');

    return (
        <Fragment>
            <div className="form-container">
                <form>
                    <div className="row mb-4">
                        <div className="col">
                            <InputField 
                                type="text"
                                id="form6Example1"
                                value={clientInfo.client_first_name}
                                onChange={handleInputChange}
                                name="client_first_name"
                                label="First name"
                                error={errors.client_first_name}
                            />
                        </div>
                        <div className="col">
                            <InputField 
                                type="text"
                                id="form6Example2"
                                value={clientInfo.client_last_name}
                                onChange={handleInputChange}
                                name="client_last_name"
                                label="Last name"
                                error={errors.client_last_name}
                            />
                        </div>
                    </div>

                    <InputField 
                        type="email"
                        id="form6Example3"
                        value={clientInfo.client_email}
                        onChange={handleInputChange}
                        name="client_email"
                        label="Email"
                        error={errors.client_email}
                    />

                    <InputField 
                        type="tel"
                        id="form6Example4"
                        value={clientInfo.client_phone_number}
                        onChange={handleInputChange}
                        name="client_phone_number"
                        label="Phone number"
                        error={errors.client_phone_number}
                    />
                    <div className="form-outline mb-4">
                        <select 
                            className="form-select"
                            id="preferredLocation"
                            value={preferredLocation}
                            onChange={(e) => {
                                handleInputChange(e);
                                setPreferredLocation(e.target.value);
                            }}
                            name="preferred_location"
                        >
                            <option value="">Select Preferred Location</option>
                            <option value="USF Campus">USF Campus</option>
                            <option value="Off-Campus">Off-Campus</option>
                            <option value="Other">Other</option>
                        </select>
                        <label className="form-label" htmlFor="preferredLocation">Preferred Location</label>
                        {errors.preferred_location && <p className="text-danger">{errors.preferred_location}</p>}
                        {preferredLocation === "Other" && 
                            <InputField 
                                type="text"
                                id="otherLocation"
                                value={clientInfo.other_location}
                                onChange={handleInputChange}
                                name="other_location"
                                label="Specify Location"
                                error={errors.other_location}
                            />
                        }
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default ClientInfoForm;
