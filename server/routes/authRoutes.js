const express = require('express');
const axios = require('axios');  // To make HTTP requests
const { google } = require('googleapis');  // Google's Node.js client library
const router = express.Router();
require('dotenv').config();


const googleAPI = axios.create({
    baseURL: 'https://www.googleapis.com/calendar/v3',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Constants from your Google Developer Console
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
);

router.get('/google', (req, res) => {
    const googleOAuthURL = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.status(200).send({googleOAuthURL});
});


router.post('/google/callback', async (req, res) => {
    const { code, appointmentData} = req.body;

    if (!code) {
        return res.status(400).send('OAuth code not present in the callback request.');
    }

    if (!appointmentData) {
        return res.status(400).send('Appointment data not present in the callback request.');
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);

        if (!appointmentData) {
            return res.status(400).send('Appointment details not found. Please try again.');
        }
        const event = {
            summary: appointmentData.summary || 'Default Summary',
            location: appointmentData.location || 'Default Location',
            description: appointmentData.description || 'Default Description',
            start: appointmentData.start,
            end: appointmentData.end,
            recurrence: appointmentData.recurrence,
            attendees: appointmentData.attendees,
            reminders: appointmentData.reminders
        };

        const googleResponse = await googleAPI.post('/calendars/primary/events', event, {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`
            }
        });

        console.log('Google response:', googleResponse.data);
        res.status(200).send('Event created successfully.');

    } catch (error) {
        console.error('Error during Google OAuth callback:', error.response ? error.response.data : error.message);
        res.status(500).send('Authentication failed');
    }
});


module.exports = router;
