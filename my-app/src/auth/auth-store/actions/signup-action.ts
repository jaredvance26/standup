import { signUp } from "../../api";
import { AuthAction } from "../auth-store";

export const signupAction =
  (email: string, password: string, onSuccess: () => void): AuthAction =>
  async ({ getState, setState }) => {
    const { isLoading } = getState();
    if (isLoading) return;
    setState({ isLoading: true });
    try {
      const response = await signUp({ email, password });
      if (response && response.user) {
        setState({
          isAuthenticated: true,
          userId: response.user.id,
          isLoading: false,
        });
        onSuccess();
      }
    } catch (error) {
      setState({ password: "" });
      console.error("Failed to login:", error);
    } finally {
      setState({ isLoading: false });
    }
  };
