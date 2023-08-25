import React, { Suspense } from 'react'; // Import useEffect
import ImageLoader from './Image.jsx';
import { Link } from 'react-router-dom';
import hero from '../../assets/7692497.png';

const Hero = () => {
    // useEffect(() => {
    //     // Initialize AOS inside the useEffect hook.
    //     AOS.init({
    //         duration: 3000 // duration of animation in milliseconds
    //     });
    // }, []); // The empty dependency array ensures that AOS.init() runs only once after the component mounts.

    return (
        <>  
            <section className="hero p-3">
                <div className="container">
                    <div className='row'>
                    <div className="col-md-6">
                        <div className='copy'>
                            <div className='text-label'>
                                Elevate Your Style with Barber Excellence
                            </div>
                            <div className='text-hero-bold cbd'>
                                Experience the Art of Classic Barbering
                            </div>
                            <div className='text-hero-regular cbd'>
                                Discover the Finest Barber Services and Unmatched Expertise
                            </div>
                            <div className='cta d-md-block d-flex justify-content-center'>
                                <Link to='/appointments'>
                                    <button type="button" className="btn btn-success btn-lg">
                                        Book An Appointment
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                        <div className='lazy col-md-6'>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ImageLoader src={hero} alt='logo' className='w-100' />
                        </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
