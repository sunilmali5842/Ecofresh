// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCotUbjYOFCahPuDGKihwXNmqVa94BtLKs",
  authDomain: "ecofresh-auth.firebaseapp.com",
  projectId: "ecofresh-auth",
  storageBucket: "ecofresh-auth.firebasestorage.app",
  messagingSenderId: "950280564332",
  appId: "1:950280564332:web:e3f30f98de79e3c0e43249",
  measurementId: "G-NJBFWQXZMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app)
export default app;