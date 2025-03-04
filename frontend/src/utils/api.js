// This file is meant to configure Axios or your fetch API settings
// It might be useful for setting up base URLs, interceptors, etc.

import axios from 'axios';
import { API_BASE_URL } from './constants';

// Configure Axios default settings here if needed
axios.defaults.baseURL = API_BASE_URL;

// You can add interceptors here for handling requests and responses globally
axios.interceptors.request.use(config => {
    // Example: Add a token to the request headers
    const token = localStorage.getItem('token'); //get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default axios; // Export axios as default
