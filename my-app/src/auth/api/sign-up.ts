import axios from 'axios';
import { AuthenticationResponse } from './contract';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

interface CreateAccountCredentials {
  email: string;
  password: string;
}


export const signUp = async (credentials: CreateAccountCredentials): Promise<AuthenticationResponse> => {
  const response = await axios.post<AuthenticationResponse>(`${API_BASE_URL}/auth/signup`, credentials);
  return response.data;
};