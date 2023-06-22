// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD87ffZa0PoXpAFbw64WftPwnqFmp2IR5I",
  authDomain: "finance-management-app-f7575.firebaseapp.com",
  projectId: "finance-management-app-f7575",
  storageBucket: "finance-management-app-f7575.appspot.com",
  messagingSenderId: "592591632587",
  appId: "1:592591632587:web:7a4a20e2c76c6e88e9434e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
