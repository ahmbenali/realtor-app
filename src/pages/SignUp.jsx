import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

import OAuth from '../components/OAuth';
import { db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Input from '../tool-kits/Input';
import { stylesImages } from '../tool-kits/stylesData';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

/*============================== Start component SignUp ===============================*/

export default function SignUp() {
	const [showPassword, setShowPassword] = useState( false );
	const navigate = useNavigate();

	const [formData, setFormData] = useState( {
		name: '',
		email: '',
		password: '',
	} );

	// before using  formData, it must been firstly defined
	const { name, email, password } = formData;

	/*============================== classes names ===============================*/

	const classes = {
		signinClass: `text-red-600 hover:text-red-700 transition duration-200
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
	};

	const { signinClass, frgtPwdClass, orDivClass, signupClass, eyeClass } =
		classes;

	/*============================== Start Event handler  ===============================*/
	// used to show or hide password when typing

	const handleEyeIconClick = () => setShowPassword( prevState => !prevState );

	const handleFormSubmit = async ev => {
		ev.preventDefault(); // prevent browser from refreshing

		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Add name to user to show it as display name
			updateProfile( auth.currentUser, {
				displayName: name,
			} );

			const { user } = userCredential;
			// console.log('USER: ', user);
			// console.log('AUTH: ', auth);

			// password should not been saved in db --> delete it from a data copy first
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp(); // time when data have been saved in db
			// create  users collection  in our db and add user to it 
			await setDoc( doc( db, 'users', user.uid ), formDataCopy );
			toast.success( 'Sign up was successful' )
			// after that redirect to the home page
			navigate( '/' )
			
		} catch ( error ) {
			// console.log(error.message);
			toast.error( 'Something went wrong with the registration' )
		}
	}
		// change states over controlled inputs (email and password)
		const handleInputChange = ev =>
			setFormData( prevState => ( {
				...prevState,
				[ev.target.id]: ev.target.value, // id --> email or password
			} ) );

		/*============================== End Event handler  ===============================*/

		//  three inputs are required for signing up: Name, email and password
		const inputFields = [
			{
				name: 'name',
				type: 'text',
				id: 'name',
				value: name,
				placeholder: 'Full name',
				className: '',
				children: null,
			},
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
				// children: <FillEye onEyeIconClick={handleEyeIconClick} />,
				children: showPassword ? (
					<AiFillEyeInvisible className={eyeClass} onClick={handleEyeIconClick} />
				) : (
					<AiFillEye className={eyeClass} onClick={handleEyeIconClick} />
				),
			},
		];

		/*==============================  ui returned ===============================*/

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
							src={stylesImages.keyImg}
							alt='key'
						/>
					</div>
					<div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
						<form onSubmit={handleFormSubmit}>
							{inputFields.map( input => {
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
							} )}
							<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
								<p className='mb-6'>
									Have a account?{' '}
									<Link to='/sign-in' className={signinClass}>
										Sign in
									</Link>
								</p>
								<Link to='/forgot-password' className={frgtPwdClass}>
									Forgot password?
								</Link>
							</div>
							<button className={signupClass} type='submit'>
								Sign up
							</button>
							{/* <div className={orDivClass}> */}
							<div
								className='my-4  before:border-t after:border-t after:flex-1  
						 before:border-gray-300 flex before:flex-1
						 justify-center items-center gap-5 after:border-gray-300
						 first-letter:first-line'
							>
								<p className='text-center font-semibold  '>OR</p>
							</div>
							<OAuth />

							{/* 	<div
							before='<< back'
							after='forward >>'
							className='my-4 font-semibold text-blue-600
							 before:content-[attr(before)] after:content-[attr(after)]
						  flex justify-center items-center	
							gap-7 before:flex-1 after:flex-2'
						>
							<strong className='text-center pr-48'>and so on...</strong>
						</div> */}
						</form>
					</div>
				</div>
			</section>
		);
	}
