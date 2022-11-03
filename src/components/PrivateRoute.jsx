import { Navigate, Outlet } from 'react-router';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export default function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus();

		if (checkingStatus) {
			return <Spinner />
		}

	if (checkingStatus) return <h3>Loading...</h3>;
	return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
}
