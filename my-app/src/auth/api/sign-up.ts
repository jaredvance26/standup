import axios from 'axios';
import { AuthenticationResponse } from './contract';

interface CreateAccountCredentials {
  email: string;
  password: string;
}


export const signUp = async (credentials: CreateAccountCredentials): Promise<AuthenticationResponse> => {
  const response = await axios.post<AuthenticationResponse>('http://localhost:3001/api/auth/signup', credentials);
  return response.data;
};