import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppointmentProvider } from './contexts/AppointmentProvider.js';
import Header from './components/home/Header.jsx';
import Home from './pages/Home.js';
import AppointmentPage from './pages/AppointmentPage.js';
import Callback from './components/appointment/Callback.jsx';
import GoogleCallback from './components/appointment/GoogleCallback.jsx';
import Admin from './pages/Admin.js';
import "./App.css";
import "./admin.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const aboutRef = React.useRef(null);
  const servicesRef = React.useRef(null);
  const contactRef = React.useRef(null);

  const withHeader = (WrappedComponent) => {
    return (props) => (
      <>
        <Header aboutRef={props.aboutRef} servicesRef={props.servicesRef} contactRef={props.contactRef} />
        <WrappedComponent {...props} />
      </>
    );
  };
  
  const HomeWithHeader = withHeader(Home);
  const AppointmentPageWithHeader = withHeader(AppointmentPage);

  return (
    <Router>
      
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<HomeWithHeader aboutRef={aboutRef} servicesRef={servicesRef} contactRef={contactRef} />} />
          <Route path="/appointments" element={<AppointmentPageWithHeader aboutRef={aboutRef} servicesRef={servicesRef} contactRef={contactRef} />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
          <Route path="/admin/*" element={<Admin />} /> {/* Admin routes without the Header */}
        </Routes>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
