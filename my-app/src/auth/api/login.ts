import axios from 'axios';
import { AuthenticationResponse } from './contract';

interface SignInCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: SignInCredentials): Promise<AuthenticationResponse> => {
  const response = await axios.post<AuthenticationResponse>('http://localhost:3001/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
