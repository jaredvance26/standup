import axios from 'axios';
import { Settings } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getUserSettings = async (userId: string): Promise<Settings> => {
  try {
    const response = await axios.get<Settings>(`${API_BASE_URL}/settings/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch user settings:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
} 