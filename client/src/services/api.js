import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/',  // Adjust this base URL to your server's address
    headers: {
        'Content-Type': 'application/json'
    },
});

export default api;
