// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FIREBASE_VARIABLES } from "./config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_VARIABLES.FIREBASE_API_KEY,
    authDomain: FIREBASE_VARIABLES.FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_VARIABLES.FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_VARIABLES.FIREBASE_STORAGE_BUDGET,
    messagingSenderId: FIREBASE_VARIABLES.FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_VARIABLES.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };