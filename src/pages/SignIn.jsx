import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import Input from '../tool-kits/Input';
import { stylesImages } from '../tool-kits/stylesData';

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const classes = {
		signInClass: `text-red-600 hover:text-red-700 transition duration-200
                  ease-in-out ml-1`,

		frgtPwdClass: `text-blue-600 hover:text-blue-800 transition 
								duration-200 ease-in-out`,

		orDivClass: `my-4 before:border-t flex  before:flex-1 items-center first-letter:first-line:
            before:border-gray-300 after:border-t after:flex-1 after:border-gray-300
							 `,

		signupClass: `w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium 
          uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
          hover:shadow-lg active:bg-blue-800`,

		eyeClass: `absolute right-3 top-3 text-xl cursor-pointer`,
		btnClass: `w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium
										uppercase rounded shadow-md hover:bg-blue-700 transition duration-150
										ease-in-out hover:shadow-lg active:bg-blue-800`,
	};
	const {
		signInClass,
		signupClass,
		frgtPwdClass,
		orDivClass,
		eyeClass,
		btnClass,
	} = classes;

	// make password typing visible or invisible
	const handleEyeIconClick = ev => setShowPassword(prevState => !prevState);

	const inputFields = [
		{
			name: 'email',
			type: 'email',
			id: 'email',
			value: email,
			placeholder: 'Email address',
			className: '',
			children: null,
		},
		{
			name: 'password',
			type: showPassword ? 'text' : 'password',
			id: 'password',
			value: password,
			placeholder: 'Password',
			className: 'relative mb-6',
			/*
			children: <FillEye onEyeIconClick={handleEyeIconClick} />,
			 this will not work because single source of truth is not respected,
			showPassword, handleEyeIconClick... are locally defined in two
			components --> solution: state lifting up or state over context api
			 */
			children: showPassword ? (
				<AiFillEyeInvisible className={eyeClass} onClick={handleEyeIconClick} />
			) : (
				<AiFillEye className={eyeClass} onClick={handleEyeIconClick} />
			),
		},
	];

	/*============================== Start events handlers ===============================*/

	async function handleFormSubmit(ev) {
		ev.preventDefault(); // prevent browser from refreshing

		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log('USER: ', userCredential.user);
			if (userCredential.user) { // if user exists --> redirect him to hompe page
				navigate('/');
			}
		} catch (error) { // otherwise he get an error
			toast.error('Bad user credentials');
		}
	}

	// change states over controlled inputs (email and password)
	const handleFormChange = ev =>
		setFormData(prevState => ({
			...prevState,
			[ev.target.id]: ev.target.value, // id --> email or password
		}));

	// change states over controlled inputs (email and password)
	const handleInputChange = ev =>
		setFormData(prevState => ({
			...prevState,
			[ev.target.id]: ev.target.value, // id --> email or password
		}));

	/*============================== End events handlers ===============================*/

	return (
		<section>
			<h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
			<div
				className='flex justify-center flex-wrap items-center
      px-6 py-12 max-w-6xl mx-auto'
			>
				<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
					<img
						className='w-full rounded-2xl'
						src={stylesImages.keyImg}
						alt='key'
					/>
				</div>
				<div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
					<form onSubmit={handleFormSubmit}>
						{/* Mapping over input fields to create form inputs  */}
						{inputFields.map(input => {
							const { type, id, value, placeholder, className, children } =
								input;

							return (
								<div key={id} className={className}>
									<Input
										type={type}
										id={id}
										value={value}
										placeholder={placeholder}
										onFormChange={handleInputChange}
									/>
									{children}
								</div>
							);
						})}

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
							<Link to='/forgot-password' className={frgtPwdClass}>
								Forgot password?
							</Link>
						</div>
						<button className={btnClass} type='submit'>
							Sign in
						</button>
						<div className={orDivClass}>
							<p className='text-center font-semibold mx-4 '>OR</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</section>
	);
}
