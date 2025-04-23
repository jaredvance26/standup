import axios from 'axios';

interface CreateAccountCredentials {
  email: string;
  password: string;
}

interface CreateAccountResponse {
  message: string;
}

export const signUp = async (credentials: CreateAccountCredentials): Promise<CreateAccountResponse> => {
  const response = await axios.post<CreateAccountResponse>('http://localhost:3001/api/auth/signup', credentials);
  return response.data;
};
