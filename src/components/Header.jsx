import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { stylesImages } from '../tool-kits/stylesData';

export default function Header() {
	const location = useLocation();
	// console.log('pathname: ', location.pathname);
	const [pageState, setPageState] = useState('Sign in');
	const navigate = useNavigate();
	const auth = getAuth();
	const pathMatchRoute = route => route === location.pathname;

	useEffect(() => {
		// update pageState in authentication
		onAuthStateChanged(auth, user =>
			setPageState(user ? 'Profile' : 'Sign in')
		);
	}, [auth]);

	const LINKS = [
		{ name: 'Home', path: '/' },
		{ name: 'Offers', path: '/offers' },
		{ name: pageState, path: auth.currentUser ? '/profile' : '/sign-in' },
	];

	return ( // for spinner z-50 -->to be over header
		<div className='bg-white border-b shadow-sm py-3 sticky top-0 z-40'>
			<header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
				<div>
					<img
						src={stylesImages.logoImg}
						alt='logo'
						className='h-5 cursor-pointer'
						onClick={ev => navigate('/')}
					/>
				</div>
				<div>
					<ul className='flex  space-x-10'>
						{LINKS.map(({ name, path }) => (
							<li
								key={name}
								className={`cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px]
               border-b-transparent ${
									pathMatchRoute(path) && 'text-black border-b-red-500'
								}`}
								onClick={ev => navigate(path)}
							>
								{name}
							</li>
						))}
					</ul>
				</div>
			</header>
		</div>
	);
}
