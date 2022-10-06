import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
	const location = useLocation();
	console.log('pathname: ', location.pathname);

	const navigate = useNavigate();

	const pathMatchRoute = route => route === location.pathname;

	const links = [
		{ name: 'Home', path: '/' },
		{ name: 'Offers', path: '/offers' },
		{ name: 'Sign In', path: '/sign-in' },
	];

	return (
		<div className='bg-white border-b shadow-sm  sticky top-0 z-50'>
			<header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
				<div>
					<img
						src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
						alt='logo'
						className='h-5 cursor-pointer'
						onClick={ev => navigate('/')}
					/>
				</div>
				<div>
					<ul className='flex  space-x-10'>
						{links.map(({ name, path }) => (
							<li
								key={name}
								className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]
               border-b-transparent ${
									pathMatchRoute(path) && 'text-black border-b-red-500'
								}`}
								onClick={ev => navigate(path)}
							>
								{name}
							</li>
						))}

						{/* <li>Home</li>
						<li>Offers</li>
						<li>Sign in</li> */}
					</ul>
				</div>
			</header>
		</div>
	);
}
