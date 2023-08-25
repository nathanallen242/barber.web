import React, { createContext, useState, useContext, useEffect } from 'react';
import http from '../services/http-common';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      // Validate the token by making an API call
      console.log("token");
      http.get('/admins/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // If the token is valid, set the user state
        console.log(response)
        setUser(response.data.user);
      })
      .catch(error => {
        // If the token is invalid, remove it from local storage
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await http.post('/admins/login', credentials);
      localStorage.setItem('token', response.data.accessToken);
      setUser(response.data.user);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
