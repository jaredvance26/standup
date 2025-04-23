import axios from 'axios';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (credentials: SignInCredentials): Promise<SignInResponse> => {
  const response = await axios.post<SignInResponse>('http://localhost:3001/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
