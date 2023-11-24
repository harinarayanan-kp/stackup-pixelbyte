import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDzHSqdEcMmKTj6ArMppiicKVuL8-MauZg",
    authDomain: "trek-stepintostyle.firebaseapp.com",
    projectId: "trek-stepintostyle",
    storageBucket: "trek-stepintostyle.appspot.com",
    messagingSenderId: "957951230094",
    appId: "1:957951230094:web:0e16f9b92c306e9e8949df",
    measurementId: "G-LQ5VZ2VG5G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db=getFirestore(app)
export const storage = getStorage(app);

