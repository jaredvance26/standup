import { login } from "../../api";
import { AuthAction } from "../auth-store";

export const loginAction = (onSuccess: () => void): AuthAction => async ({getState, setState}) => {
	const { isLoading, email, password } = getState();
	if (isLoading) return;
	setState({isLoading: true});
	try {
		const response = await login({email, password});
		if (response && response.user) {
			setState({
				isAuthenticated: true,
				userId: response.user.id,
				isLoading: false,
				password: '',
			});
			onSuccess();
		}
	} catch (error) {
		setState({password: ''})
		console.error('Failed to login:', error);
	} finally {
		setState({isLoading: false});
	}
}