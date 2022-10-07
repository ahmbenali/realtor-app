// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDOb956ZCHuAUekYYP23rpr3yUh1HJmxRA',
	authDomain: 'realtor-app-a0f59.firebaseapp.com',
	projectId: 'realtor-app-a0f59',
	storageBucket: 'realtor-app-a0f59.appspot.com',
	messagingSenderId: '975299590325',
	appId: '1:975299590325:web:ff66836818d9a00896e6fc',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
