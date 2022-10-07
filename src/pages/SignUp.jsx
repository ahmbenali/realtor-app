import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formData;

	const FillEye = () =>
		showPassword ? (
			<AiFillEyeInvisible
				className='
              absolute right-3 top-3 text-xl cursor-pointer'
				onClick={ev => setShowPassword(prevState => !prevState)}
			/>
		) : (
			<AiFillEye
				className='
              absolute right-3 top-3 text-xl cursor-pointer'
				onClick={ev => setShowPassword(prevState => !prevState)}
			/>
		);

	const inputs = [
		{
			type: 'name',
			id: 'name',
			value: name,
			placeholder: 'Full name',
			className: '',
			children: [],
		},
		{
			type: 'email',
			id: 'email',
			value: email,
			placeholder: 'Email address',
			className: '',
			children: [],
		},
		{
			type: 'password',
			id: 'password',
			value: password,
			placeholder: 'Password',
			className: 'relative mb-6',
			children: [<FillEye />],
		},
	];

	return (
		<section>
			<h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
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
					<form>
						{inputs.map(input => {
							const {
								type,
								name,
								id,
								value,
								placeholder,
								className,
								children,
							} = input;
							return (
								<div className={className}>
									<input
										key={id}
										className='w-full px-4 py-2 text-xl text-gray-700 mb-6
                                              bg-white border-gray-300 rounded transition ease-in-out'
										type={type}
										id={id}
										value={value}
										onChange={ev =>
											setFormData(prevState => ({
												...prevState,
												[ev.target.id]: ev.target.value,
											}))
										} // for both email and password
										// email: ev.target.value}))}
										placeholder={placeholder}
									/>
									{children}
								</div>
							);
						})}
						<dv className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
							<p className='mb-6'>
								Have a account?{' '}
								<Link
									to='/sign-in'
									className='text-red-600 hover:text-red-700 transition duration-200
                  ease-in-out ml-1'
								>
									Sign in
								</Link>
							</p>
							<Link
								to='/forgot-password'
								className='text-blue-600 hover:text-blue-800 transition duration-200
                  ease-in-out'
							>
								Forgot password?
							</Link>
						</dv>
						<button
							className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium 
          uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
          hover:shadow-lg active:bg-blue-800 '
							type='submit'
						>
							Sign up
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
