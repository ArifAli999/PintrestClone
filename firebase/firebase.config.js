import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from 'firebase/functions'


export const firebaseConfig = {
    apiKey: "AIzaSyBDvMXp4jEUjggujtPkMIb4GoFIGx9S560",
    authDomain: "igclone-8420a.firebaseapp.com",
    projectId: "igclone-8420a",
    storageBucket: "igclone-8420a.appspot.com",
    messagingSenderId: "850678061652",
    appId: "1:850678061652:web:5e0b8225d8b651d5d1ebc1",
    measurementId: "G-FCEV3W65QE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const functions = getFunctions(app);