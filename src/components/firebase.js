import { getFirestore, collection } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCr9xfp9mbSlUAmPYwUsvgSUN1P5JShtRU",
    authDomain: "tonye-project.firebaseapp.com",
    projectId: "tonye-project",
    storageBucket: "tonye-project.appspot.com",
    messagingSenderId: "635843752578",
    appId: "1:635843752578:web:1629506711d96f374ffa9b"
};
// Initialize Firebase
var app = initializeApp(firebaseConfig);
export var db = getFirestore(app);
export var colref = collection(db, 'UserInfo');
