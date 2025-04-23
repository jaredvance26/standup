import { Action, createHook, createStore, defaults } from "react-sweet-state";
import { loginAction, setAuthDataAction } from "./actions";

defaults.devtools = true;
// Define the state interface
export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  isLoading: boolean;
  email: string;
  password: string;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
  userId: null,
  isLoading: false,
  email: "",
  password: "",
};

// Define actions
const actions = { loginAction, setAuthDataAction };

// Create the store
const AuthStore = createStore({
  initialState,
  actions,
});

export type AuthAction = Action<AuthState>;

// Create hooks
export const useAuthStore = createHook(AuthStore);
