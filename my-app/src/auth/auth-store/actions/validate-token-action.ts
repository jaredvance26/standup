import { validateToken } from "../../api";
import { AuthAction } from "../auth-store";

export const validateTokenAction = (): AuthAction => async ({getState, setState}) => {
	const { isTokenValidationLoading } = getState();
	if (isTokenValidationLoading) return;
	setState({ isTokenValidationLoading: true });

	try {
		const token = localStorage.getItem("token");
		if (!token) {
			setState({ isAuthenticated: false, isTokenValidationLoading: false });
			return;
		}
		const response = await validateToken(token);
		if (response.data.valid) {
			setState({ isAuthenticated: true, isTokenValidationLoading: false });
		} else {
			setState({ isAuthenticated: false, isTokenValidationLoading: false });
		}
	} catch (error) {
		console.error('Failed to validate token:', error);
		setState({ isAuthenticated: false, isTokenValidationLoading: false });
		localStorage.removeItem("token");
	} finally {
		setState({ isTokenValidationLoading: false });
	}
}