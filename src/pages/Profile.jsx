import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebase';
import Input from '../tool-kits/Input';

export default function Profile() {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetail, setChangeDetails] = useState(false);

	const [formData, setFormData] = useState({
		// name: 'Ahmed', // data should later come from database
		// email: 'ahdbenali@gmail.com',
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	/*============================== classes names ===============================*/

	const classes = {
		spanClass: `text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer
									`,
		signoutClass:
			'text-blue-600 hover:text-blue-800 cursor-pointer transition duration-200e ease-in-out',
	};

	const { spanClass, signoutClass } = classes;

	/*============================== Start Event handler  ===============================*/

	const handleFormSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// update display name in firebase authentication
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// update name in firebase database
				const docRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(docRef, { name });
			}
			toast.success('Profile details updated');
		} catch (error) {
			toast.error('Could not update the profile details');
		}
	};

	// change states over controlled inputs (email and password)
	const handleInputChange = ev => {
		setFormData(prevState => ({
			...prevState,
			[ev.target.id]: ev.target.value,
		}));
	};

	const handleLogoutClick = (name, email) => {
		auth.signOut();
		navigate('/');
	};

	/*============================== End Event handler  ===============================*/

	//  three inputs are required for signing up: Name, email and password
	const inputFields = [
		{
			name: 'name',
			type: 'text',
			id: 'name',
			value: name,
			placeholder: 'Full name',
			className: changeDetail ? 'bg-red-200 focus:bg-red-200' : null,
			disabled: !changeDetail,
			children: null,
		},
		{
			name: 'email',
			type: 'email',
			id: 'email',
			value: email,
			placeholder: 'Email address',
			className: '',
			disabled: true,
			children: null,
		},
	];

	/*==============================  ui returned ===============================*/

	return (
		<>
			<section className='max-w-6xl mx-auto flex flex-col justify-center items-center '>
				<h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>

				<div className='w-full md:w-[50%] mt-6 px-3'>
					<form onSubmit={handleFormSubmit}>
						{inputFields.map(
							({
								type,
								id,
								value,
								placeholder,
								disabled,
								className,
								children,
							}) => {
								return (
									<div key={id}>
										<Input
											type={type}
											id={id}
											value={value}
											disabled={disabled}
											placeholder={placeholder}
											onInputChange={handleInputChange}
											className={className}
										/>
										{children}
									</div>
								);
							}
						)}
						<div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
							<p className='flex items-center  '>
								Do you want to change your name?
								<span
									onClick={() => {
										changeDetail && handleFormSubmit();
										setChangeDetails(prevState => !prevState);
									}}
									className={spanClass}
								>
									{!changeDetail ? 'Edit' : 'Apply changes'}
								</span>
							</p>
							<p onClick={handleLogoutClick} className={signoutClass}>
								Sign out
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
