import { useState } from 'react';
import Button from '../tool-kits/Button';
import Input from '../tool-kits/Input';

export default function CreateListing() {
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		description: '',
		offer: true,
		regularPrice: 0,
		discountedPrice: 0,
	});

	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		description,
		offer,
		regularPrice,
		discountedPrice,
	} = formData;

	/*============================== style classes names ===============================*/
	const basicClass = ` font-medium shadow-md rounded hover:shadow-lg
           focus:shadow-lg active:shadow-lg  `;

	const textareaClass = ` w-full px-4  py-2 text-lg text-gray-700 bg-white   border 
					 border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 
					 focus:bg-white focus:border-slate-600 `;
	/*============================== Start events handlers ===============================*/
	const handleInputChange = () => {};
	/*============================== End events handlers ===============================*/

	return (
		<main className='max-w-md px-2 mx-auto'>
			<h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
			<form>
				{/*========= SELL AND RENT BUTTONS ===============================*/}
				<p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
				<div className='flex justify-center items-center gap-2 '>
					{/* no submit button needed here */}
					<Button
						type='button'
						id='type'
						value='sale'
						onChange={handleInputChange}
						// className={`${basicClass}${
						className={`${basicClass}${
							type === 'rent'
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}
					>
						sell
					</Button>
					<Button
						type='button'
						id='type'
						value='sale'
						onChange={handleInputChange}
						className={`${basicClass}${
							type === 'sell'
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}
					>
						rent
					</Button>
				</div>

				{/*============================== NAME INPUT ===============================*/}
				<label
					htmlFor='name'
					className='text-lg inline-block mt-6 font-semibold'
				>
					Name
				</label>
				<Input
					type='text'
					id='name'
					value={name}
					onChange={handleInputChange}
					placeholder='Name'
					minLength='10'
					maxLength='32'
					required
					// this input has the default className of Input component --> no extra props
					className=''
				/>

				{/*========= BEDROOMS  INPUT ===============================*/}
				<div className='flex space-x-6 '>
					<div className='flex flex-col'>
						{/* <p className='text-lg font-semibold'>Beds</p> */}
						<label htmlFor='bedrooms' className='text-lg font-semibold   '>
							Beds
						</label>
						<Input
							type='number'
							id='bedrooms'
							value={bedrooms}
							onChange={handleInputChange}
							minLength='1'
							maxLength='20'
							required
							className='text-center w-20'
						/>
					</div>

					{/*=========  BATHROOMS INPUT ===============================*/}
					<div className='flex flex-col'>
						{/* <p className='text-lg font-semibold'>Baths</p> */}
						<label htmlFor='bathrooms' className='text-lg font-semibold  '>
							Baths
						</label>
						<Input
							type='number'
							id='bathrooms'
							value={bathrooms}
							onChange={handleInputChange}
							minLength='1'
							maxLength='20'
							required
							className='text-center w-20 '
						/>
					</div>
				</div>

				{/*========= PARKING SPOT BUTTONS  ===============================*/}
				<p className='text-lg  font-semibold'>Parking spot</p>
				<div className='flex justify-center items-center gap-2 '>
					{/* no submit button needed here */}
					<Button
						type='button'
						id='parking'
						value={true}
						onChange={handleInputChange}
						// className={`${basicClass}${
						className={`${basicClass}${
							!parking ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}
					>
						yes
					</Button>
					<Button
						type='button'
						id='parking'
						value={false}
						onChange={handleInputChange}
						className={`${basicClass}${
							parking ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}
					>
						no
					</Button>
				</div>

				{/*========= FURNISHED BUTTONS ===============================*/}
				<p className='text-lg mt-6 font-semibold'>Furnished</p>
				<div className='flex justify-center items-center gap-2 '>
					{/* no submit button needed here */}
					<Button
						type='button'
						id='furnished'
						value={true}
						onChange={handleInputChange}
						className={`${basicClass}${
							!furnished ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}
					>
						yes
					</Button>
					<Button
						type='button'
						id='furnished'
						value={false}
						onChange={handleInputChange}
						className={`${basicClass}${
							furnished ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}
					>
						no
					</Button>
				</div>

				{/*========== ADDRESS FIELD ===============================*/}
				<label
					htmlFor='address'
					className='text-lg inline-block mt-6 font-semibold'
				>
					Address
				</label>
				<textarea
					type='text'
					id='address'
					value={address}
					onChange={handleInputChange}
					placeholder='Address'
					// this input has the default className of Input component --> no extra props
					className={textareaClass}
				/>

				{/*========= DESCRIPTION FIELD ===============================*/}
				<label
					htmlFor='description'
					className='text-lg inline-block mt-6 font-semibold'
				>
					Description
				</label>
				<textarea
					type='text'
					id='description'
					value={description}
					onChange={handleInputChange}
					placeholder='Description'
					// this input has the default className of Input component --> no extra props
					className={textareaClass}
				/>

				{/*========= OFFER BUTTONS ===============================*/}
				<p className='text-lg mt-6 font-semibold'>Offer</p>
				<div className='flex justify-center items-center gap-2 mb-6'>
					{/* no submit button needed here */}
					<Button
						type='button'
						id='offer'
						value={true}
						onChange={handleInputChange}
						className={`${basicClass}${
							!offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}
					>
						yes
					</Button>
					<Button
						type='button'
						id='offer'
						value={false}
						onChange={handleInputChange}
						className={`${basicClass}${
							offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}
					>
						no
					</Button>
				</div>

				{/*========= REGULAR PRICE ===============================*/}
				<div className='flex  justify-start items-center gap-5'>
					<label className='text-lg font-semibold '>
						<p>Regular Price</p>
						<Input
							id='regularPrice'
							type='number'
							value={regularPrice}
							required
							min='20'
							max='500000000'
							onChange={handleInputChange}
							className='text-center '
						/>
					</label>
					{type === 'rent' && (
						<div>
							<p className='w-full text-md whitespace-nowrap'>$ / Month</p>
						</div>
					)}
				</div>

				{/*========= DISCOUNTED PRICE ===============================*/}
			</form>
			{offer && (
				<div className='flex  justify-start items-center gap-5'>
					<label className='text-lg font-semibold '>
						<p>Discounted Price</p>
						<Input
							className='text-center '
							id='discountedPrice'
							type='number'
							value={discountedPrice}
							required
							min='20'
							max='500000000'
							onChange={handleInputChange}
						/>
					</label>
					{type === 'rent' && (
						<div>
							<p className='w-full text-md whitespace-nowrap'>$ / Month</p>
						</div>
					)}
				</div>
			)}

			{/*========= IMAGES ===============================*/}
			<div className='mb-6'>
				<p className='text-lg font-semibold'>Images</p>
				<p className='text-gray-600600'>
					Them first image will be the cover (max 6)
				</p>
				<Input
					className='px-3 py-1.5 text-gray-600'
					type='file'
					id='images'
					onChange={handleInputChange}
					accept='.jpg, .png, .jpeg'
					multiple
					required
				/>
			</div>

			{/*========= SUBMIT BUTTON ===============================*/}
			<Button
				type='submit'
				className='bg-blue-600 text-white mb-6 text-sm
			shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
			active:bg-blue-800 active:shadow-lg font-medium'
			>
				create listening
			</Button>
		</main>
	);
}
