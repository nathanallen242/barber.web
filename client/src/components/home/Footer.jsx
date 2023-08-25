import React from "react";
import logo from '../../assets/test2.png';
import appStoreSVG from '../../assets/apple.svg';
import playStoreSVG from '../../assets/playstore.svg';

const Footer = () => {
  return (
    <footer className="text-black py-5">
      <div className='container'>
        <div className='row'>

          <div className='col-md-3'>
            <img src={logo} alt='Logo'  />
            <p className='text-wrap' style={{width: '10rem'}}>A barber-centric platform to improve the way we serve our clientele.</p>
            <div className='footer-icon d-flex py-3'>
              <ion-icon name="logo-facebook"/>
              <ion-icon name="logo-instagram"/>
              <ion-icon name="logo-twitter" />
              <ion-icon name="logo-youtube"/>
            </div>
          </div>

          <div className='footer-col col-md-2 mt-2'>
            <h2 className="mt-2">About</h2>
            <ul className="list-unstyled">
              <li>About Us</li>
            </ul>
          </div>

          <div className='footer-col col-md-2 mt-2'>
            <h2 className="mt-2">Services</h2>
            <ul className="list-unstyled">
              <li>Our Services</li>
            </ul>
          </div>
           {/* Adding the contact details */}
           <div className="footer-col col-md-2 mt-2">
            <h2 className="mt-2">Contact</h2>
            <ul className="contact-icon list-unstyled">
              <li className="d-flex align-items-center">
                <ion-icon style={{'color': 'lightblue'}} name="airplane-outline"></ion-icon>
                <p className="mb-3 ml-4">Tampa, Florida 33620 USA</p>
              </li>
              <li className="d-flex align-items-center">
                <ion-icon style={{'color': 'black'}} name="call-outline"></ion-icon>
                <p className="mb-3 ml-4">+ 01 234 567 89</p>
              </li>
              <li className="d-flex align-items-center">
                <ion-icon style={{'color': 'darkred'}} name="mail-outline"></ion-icon>
                <p className="mb-3 ml-4">barber-io@gmail.com</p>
              </li>
            </ul>
          </div>

          
          <div className='footer-col col-md-2 mx-auto'>
            <h2 className="mt-2">Download Our App</h2>
            <div className='icon d-flex' style={{flexDirection: 'column'}}>
              <img src={playStoreSVG} alt='Download from Play Store' />
              <img src={appStoreSVG} alt='Download from App Store' />
            </div>
          </div>

        </div>

        <div className='legal mt-5 pt-4 border-top'>
          <h2 className="mb-0 fs-6">Copyright @2023. All rights reserved.</h2>
          <h2 className="mb-0 fs-6">
            Design & Developed by <span className="text-success">Nathan Allen</span>
          </h2>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
