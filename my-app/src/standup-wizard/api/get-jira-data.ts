import axios from 'axios';
import { JiraGetData } from '../types/jira';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getJiraData = async (): Promise<JiraGetData> => {
  try {
    const response = await axios.get<JiraGetData>(`${API_BASE_URL}/jira/issues`, {
      headers: {
        'Content-Type': 'application/json',
      },
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