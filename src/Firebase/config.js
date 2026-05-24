// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn6fIJ3KT4CrypSAecg13OYbY_fq5RCIc",
    authDomain: "proyecto-final-24a93.firebaseapp.com",
    projectId: "proyecto-final-24a93",
    storageBucket: "proyecto-final-24a93.firebasestorage.app",
    messagingSenderId: "2075334368",
    appId: "1:2075334368:web:0fc333f42e0452fa72e285"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);