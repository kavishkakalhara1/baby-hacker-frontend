// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kalshield-52ebd.firebaseapp.com",
  projectId: "kalshield-52ebd",
  storageBucket: "kalshield-52ebd.appspot.com",
  messagingSenderId: "174315710439",
  appId: "1:174315710439:web:819412cef45a6b52e2bf42",
  measurementId: "G-KF7LZ6592F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


