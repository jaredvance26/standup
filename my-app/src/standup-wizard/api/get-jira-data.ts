import axios from 'axios';
import { JiraGetData } from '../types/jira';
import { getAuthHeaders } from "../../api/auth-headers";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getJiraData = async (userId: string): Promise<JiraGetData> => {
  try {
    const response = await axios.get<JiraGetData>(`${API_BASE_URL}/user/${userId}/jira/issues`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Jira API error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
