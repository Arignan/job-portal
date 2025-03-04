import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // Import the base URL

export const applyToJob = async (jobId, applicationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/applications/${jobId}`, applicationData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add more application-related API calls here
