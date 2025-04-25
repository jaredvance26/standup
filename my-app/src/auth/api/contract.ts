export interface AuthenticationResponse {
	token: string;
	user: {
	  id: string;
	  email: string;
	};
  }