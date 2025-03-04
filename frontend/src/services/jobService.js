import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // Import the base URL

export const getAllJobs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getJobById = async (jobId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
        return response.data;
    } catch(e){
        throw e.response?.data || e.message;
    }
};

export const createJob = async (jobData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
        return response.data;
    } catch(e){
        throw e.response?.data || e.message;
    }
};

export const updateJob = async (jobId, jobData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/jobs/${jobId}`, jobData);
        return response.data;
    } catch(e){
        throw e.response?.data || e.message;
    }
};

export const deleteJob = async (jobId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/jobs/${jobId}`);
        return response.data;
    } catch(e){
        throw e.response?.data || e.message;
    }
};

// Add more job-related API calls here
