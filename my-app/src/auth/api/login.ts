import axios from 'axios';
import { AuthenticationResponse } from './contract';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface SignInCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: SignInCredentials): Promise<AuthenticationResponse> => {
  const response = await axios.post<AuthenticationResponse>(`${API_BASE_URL}/auth/login`, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
