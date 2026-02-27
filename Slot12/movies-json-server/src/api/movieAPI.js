import axios from 'axios';

const movieApi = axios.create({
    baseURL: 'http://localhost:3001', // Use IP instead of localhost for Windows compatibility
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default movieApi;
