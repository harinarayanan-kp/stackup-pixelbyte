// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { GoogleAuthProvider, getAuth } from 'firebase/auth'

import { getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzHSqdEcMmKTj6ArMppiicKVuL8-MauZg",
    authDomain: "trek-stepintostyle.firebaseapp.com",
    projectId: "trek-stepintostyle",
    storageBucket: "trek-stepintostyle.appspot.com",
    messagingSenderId: "957951230094",
    appId: "1:957951230094:web:0e16f9b92c306e9e8949df",
    measurementId: "G-LQ5VZ2VG5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();


export const db=getFirestore(app)