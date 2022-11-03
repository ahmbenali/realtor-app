import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function useAuthStatus() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	// ask firebase if user is authenticated or not --> user is signing in
	useEffect(() => {
		const auth = getAuth();
		// console.log('AUTH: ', auth);

		onAuthStateChanged(auth, user => {
			if (user) setLoggedIn(true); // user exists(signed in)
			setCheckingStatus(false);
		});
	}, []);

	return { loggedIn, checkingStatus };
}
