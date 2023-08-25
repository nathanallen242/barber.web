// __tests__/adminRoutes.test.js
const jwt = require('jsonwebtoken');
const request = require('supertest');
const express = require('express');
const adminRoutes = require('../routes/adminRoutes');

const app = express();
app.use(express.json()); // For JSON request body parsing
app.use('/admin', adminRoutes);
require('dotenv').config();
const SECRET_KEY = 'abc123';


// Mock user data
const mockUser = {
    id: 1,
    username: 'admin',
    email: 'admin@admin.edu',
    password: '12345'
    // any other data your token needs
  };
  
  // Function to generate a mock token
  const generateMockToken = (user) => {
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  };
  
  // Function to set up the mock Bearer token
  const requestWithToken = (url) => {
    const token = generateMockToken(mockUser);
    return request(app).get(url).set('Authorization', `Bearer ${token}`);
  };

describe('Admin Routes', () => {
  // A test case for getting all appointments
  it('should get all appointments', async () => {
    const res = await requestWithToken('/admin/appointments');
    expect(res.statusCode).toEqual(200);
    // Add more expectations about the response here
  });

  // A test case for getting an appointment by ID
  it('should get a single appointment', async () => {
    const appointmentId = 10; // Replace with an actual ID in your database
    const res = await requestWithToken(`/admin/appointments/${appointmentId}`);
    expect(res.statusCode).toEqual(200);
    // Add more expectations about the response here
  });
});
