// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm9QFynNUr-MA0Io46xLBQpIKB7LKkEY4",
  authDomain: "asap-project-2a694.firebaseapp.com",
  projectId: "asap-project-2a694",
  storageBucket: "asap-project-2a694.appspot.com",
  messagingSenderId: "207733013056",
  appId: "1:207733013056:web:5e213072dbbb1021273da5",
  measurementId: "G-8JQ6Y50541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const colref = collection(db,'UserInfo');
