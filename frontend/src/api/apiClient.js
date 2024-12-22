import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Adjust to match your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;