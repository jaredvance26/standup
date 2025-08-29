import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const validateToken = (token: string) => {
  return axios.post(`${API_BASE_URL}/auth/validate-token`, { token });
};