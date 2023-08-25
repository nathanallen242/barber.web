import React from 'react';
import Hero from '../components/home/Hero.jsx';
import About from '../components/home/About.jsx';
import Services from '../components/home/Services.jsx';
import Contact from '../components/home/Contact.jsx';
import Footer from '../components/home/Footer.jsx';

const Home = ({ aboutRef, servicesRef, contactRef }) => {
  return (
    <>
      <Hero />
      <About ref={aboutRef} />
      <Services ref={servicesRef} />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
}

export default Home;
