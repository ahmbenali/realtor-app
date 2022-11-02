import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');

	/*============================== Start events handlers ===============================*/
	async function onFormSubmit(ev) {
		ev.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was sent');
		} catch (error) {
			toast.error('Could not send reset password');
		}
	}
	/*============================== End events handlers ===============================*/

	return (
		<section>
			<div
				className='flex justify-center flex-wrap items-center
      px-6 py-12 max-w-6xl mx-auto'
			>
				<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
					<img
						className='w-full rounded-2xl'
						src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8a2V5c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
						alt='key'
					/>
				</div>
				<div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
					<form onSubmit={onFormSubmit}>
						<div>
							<input
								onChange={() => setEmail(ev.target.value)}
								className='w-full px-4 py-2 text-xl text-gray-700 mb-6
                              bg-white border-gray-300 rounded transition ease-in-out'
								type='email'
								id='email'
								value={email}
								placeholder='Email address'
							/>
						</div>

						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
							<p className='mb-6'>
								Don't have a account?{' '}
								<Link
									to='/sign-up'
									className='text-red-600 hover:text-red-700 transition duration-200
                  ease-in-out ml-1'
								>
									Register
								</Link>
							</p>
							<Link
								to='/sign-in'
								className='text-blue-600 hover:text-blue-800 transition duration-200
                  ease-in-out'
							>
								Sign in instead
							</Link>
						</div>
						<button
							className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium 
          uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
          hover:shadow-lg active:bg-blue-800 '
							type='submit'
						>
							Send reset Password
						</button>
						<div
							className='my-4 before:border-t flex  before:flex-1 items-center first-letter:first-line:
            before:border-gray-300 after:border-t after:flex-1 after:border-gray-300
            '
						>
							<p className='text-center font-semibold mx-4 '>OR</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</section>
	);
}
