// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN7wN-UlAymPCryt2bVX506HWRCVK9o14",
  authDomain: "richard-broker.firebaseapp.com",
  projectId: "richard-broker",
  storageBucket: "richard-broker.firebasestorage.app",
  messagingSenderId: "303100071859",
  appId: "1:303100071859:web:bfb8f4d27c302336dac5c6",
  measurementId: "G-XEBMSLX6KF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const colref = collection(db,'UserInfo');