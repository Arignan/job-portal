import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // Import the base URL

// Helper function to set the Authorization header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signupUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      // Set token if signup returns one, or leave it to login after signup
      if (response.data.token) {
          setAuthToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };


export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/profile`);
        return response.data;
    } catch(e){
        throw e.response?.data || e.message;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/auth/profile`, userData);
        return response.data;
    } catch(e){
        throw e.response?.data || e.message;
    }
};

// Add more authentication-related API calls here
