import { FcGoogle } from 'react-icons/fc';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
	const navigate = useNavigate();

	const className = `flex items-center justify-center w-full bg-red-700
    text-white px-7 py-3 uppercase text-sm font-medium rounded hover:bg-red-800
    active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg`;

	/*============================== Start events handlers ===============================*/
	async function handleGoogleClick() {
		// sign in with pop up return a promise
		try {
			const auth = getAuth();
			// create the provider
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const { user } = result;
			console.log('USER: ', user);

			// check for the user --> create an address docRef to compare it with others in db collection
			// doc method has 3 parameters: db, collection and uid
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef); // check wether a document with uid
			// exists in the collection users --> save it in docSnap

			if (!docSnap.exists()) {
				// insert new user in the collection
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			// after signing up redirect the user to the home page
			navigate('/');  
		} catch (error) {
			toast.error('Could not authorize with Google');
			console.log('ERROR: ',error);
		}
	}

	/*============================== End events handlers ===============================*/

	return (
		<button // this button is defined inside the form (see SignUp.jsx)
			//  -> will be submitted too, because button has per default type submit
			type='button' // change type of button to prevent submitting
			onClick={handleGoogleClick} // handle onClick event instead of form submitting
			className={`${className}`}
		>
			<FcGoogle className='text-2xl bg-white rounded-full mr-2' />
			Continue with Google
		</button>
	);
}
