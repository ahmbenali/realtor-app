// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASkRjp4evWf9H1r2E1VaPJlEfZEmRb7qg",
  authDomain: "realtor-proj.firebaseapp.com",
  projectId: "realtor-proj",
  storageBucket: "realtor-proj.appspot.com",
  messagingSenderId: "928983268605",
  appId: "1:928983268605:web:6122167208f67119b95294"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()


