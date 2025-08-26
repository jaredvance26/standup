import axios from 'axios';
import { SettingsContract } from './contracts';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const updateSettings = async (userId: string, settings: SettingsContract): Promise<SettingsContract> => {
  try {
    const response = await axios.put<SettingsContract>(`${API_BASE_URL}/user/${userId}/settings`, settings, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to update user settings:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
