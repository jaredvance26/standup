import {
	AuthAction,
	AuthState,
} from "../auth-store";

export const setAuthDataAction =
  (partialState: Partial<AuthState>): AuthAction =>
  ({ setState }) => {
	setState(partialState);
  };
