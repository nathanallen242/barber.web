// About.jsx
import React from 'react';
import profilePic from '../../assets/7692543.png';

const About = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="mb-5 container about-container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <img src={profilePic} alt="Profile" className="img-fluid profile-img" />
                </div>
                <div className="col-lg-6">
                    <h2>About Us</h2>
                    <p className='fs-4'>
                    Our mission is to revolutionize the barbering experience, ensuring it's not just about a haircut or shave but about improving accessibility and efficiency. 
                    We've implemented efficient client management systems, ensuring every appointment is seamless, every service is top-notch, and every visit leaves you feeling valued. 
                    We're not just changing the way we work; we're making sure we work for you.
                    </p>
                </div>
            </div>
        </div>
    );
});

export default About;
