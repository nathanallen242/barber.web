import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import { useAuth } from '../../contexts/AuthContext'; // Importing useAuth
import 'bootstrap/dist/css/bootstrap.min.css';
import hero from '../../assets/test2.png';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { user, login } = useAuth(); 
    const navigate = useNavigate(); // Using useNavigate

    useEffect(() => {
        if (user) {
            navigate('/admin/index');
        }
    }, [user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.username === '' || credentials.password === '') {
            setError('Both fields are required.');
            return;
        }
        const success = await login(credentials); // Use login function from Auth Provider
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-8 col-md-6 m-auto py-5">
                    <div className="card mt-5 border-0 shadow">
                        <div className="card-body d-flex justify-content-center align-items-center flex-column">
                            <img src={hero} alt="hero" className="mb-4" />
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="username" id="username" className="form-control my-3 py-2" placeholder="Username" required value={credentials.username} onChange={handleInputChange} />
                                <input type="password" name="password" id="password" className="form-control my-3 py-2" placeholder="Password" required value={credentials.password} onChange={handleInputChange} />
                                
                                {error && <div className="text-danger mb-2">{error}</div>}

                                <div className="text-center mt-3">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
