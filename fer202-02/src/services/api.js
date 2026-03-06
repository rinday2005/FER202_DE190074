import axios from 'axios';

const API_URL = 'http://localhost:9999';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const accountService = {
    getAccounts: () => api.get('/accounts'),
    getAccountById: (id) => api.get(`/accounts/${id}`),
    updateAccount: (id, data) => api.patch(`/accounts/${id}`, data)
};

export default api;
