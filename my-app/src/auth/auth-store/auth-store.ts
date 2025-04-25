import {
  Action,
  createContainer,
  createHook,
  createStore,
  defaults,
} from "react-sweet-state";
import {
  loginAction,
  setAuthDataAction,
  signupAction,
  validateTokenAction,
} from "./actions";

defaults.devtools = true;
// Define the state interface
export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  isLoading: boolean;
  isTokenValidationLoading: boolean;
  email: string;
  password: string;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
  userId: null,
  isLoading: false,
  isTokenValidationLoading: false,
  email: "",
  password: "",
};

// Define actions
const actions = {
  loginAction,
  setAuthDataAction,
  signupAction,
  validateTokenAction,
};

// Create the store
const AuthStore = createStore({
  initialState,
  actions,
});

export type AuthAction = Action<AuthState>;

// Create hooks
export const useAuthStore = createHook(AuthStore);

//create container with onInit that dispatches validateTokenAction
export const AuthContainer = createContainer<
  typeof initialState,
  typeof actions
>(AuthStore, {
  onInit:
    () =>
    ({ dispatch }) =>
      dispatch(validateTokenAction()),
});
