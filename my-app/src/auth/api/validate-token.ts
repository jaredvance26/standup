import axios from 'axios';

export const validateToken = (token: string) => {
  return axios.post('http://localhost:3001/api/auth/validate-token', { token });
};