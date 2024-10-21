import axios from 'axios';

const API_BASE_URL = 'https://api.music-distribution-platform.com'; // Replace with actual API URL

export const distributeTrack = async (trackData: any, userId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/distribute`, {
      trackData,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error distributing track:', error);
    throw error;
  }
};

export const getDistributionStatus = async (trackId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status/${trackId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting distribution status:', error);
    throw error;
  }
};

export const getEarnings = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/earnings/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting earnings:', error);
    throw error;
  }
};