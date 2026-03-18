import axios from 'axios';
import { SettingsGETContract, SettingsPOSTContract } from './contracts';
import { getAuthHeaders } from "../../api/auth-headers";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const updateSettings = async (userId: string, settings: SettingsPOSTContract): Promise<SettingsGETContract> => {
  try {
    const response = await axios.put<SettingsGETContract>(`${API_BASE_URL}/user/${userId}/settings`, settings, {
      headers: getAuthHeaders(),
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
