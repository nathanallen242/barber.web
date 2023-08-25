import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/test2.png';

const Header = ({ aboutRef, servicesRef, contactRef }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navigateAndScroll = (path, ref) => {
        console.log(`Trying to navigate to: ${path}`);
        
        if (!ref.current) {
            console.log("Ref is not available. Likely not on the right page or component hasn't rendered yet.");
        }
    
        if (location.pathname !== path || !ref.current) {
            console.log("Navigating to the desired page...");
            navigate(path);
            
            setTimeout(() => {
                if (ref.current) {
                    console.log("Scrolling to the desired section...");
                    ref.current.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.log("Ref still not available after navigation. Component might not have rendered yet.");
                }
            }, 800);  // Adjust timeout as needed, depending on your app's navigation/rendering speed
        } else if (ref.current) {
            console.log("Already on the desired page. Scrolling to the desired section...");
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    


    const [navExpanded, setNavExpanded] = useState(false);

    const toggleNavbar = () => {
        setNavExpanded(!navExpanded);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container flex">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt='Logo' style={{width: '150px', height: 'auto'}}/>
                </Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar} 
                        aria-controls="navbarSupportedContent" aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${navExpanded ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <button className='nav-link' onClick={() =>  navigateAndScroll('/', servicesRef)}>Services</button>
                        </li>
                        <li className="nav-item">
                        <button className="nav-link" onClick={() =>  navigateAndScroll('/', aboutRef)}>About</button>
                        </li>
                        <li className="nav-item">
                        <button className="nav-link" onClick={() =>  navigateAndScroll('/', contactRef)}>Contact</button>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/dashboard">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="btn btn-success btn-lg font-weight-bold" 
                                onClick={() => {
                                    if (location.pathname === "/appointments") {
                                        window.location.reload();
                                    } else {
                                        navigate("/appointments");
                                    }
                                }}>
                                Book An Appointment
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;
