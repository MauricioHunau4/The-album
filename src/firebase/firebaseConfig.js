
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export default function firebaseInit(){
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_FIREBASE_APPID
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);
}