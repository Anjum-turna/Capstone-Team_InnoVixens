// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace these values with your real project keys from Firebase Console
// Settings -> Project Settings -> General -> Your Apps -> SDK Setup
const firebaseConfig = {
  apiKey: "AIzaSyD-PLACEHOLDER-KEY",
  authDomain: "hellomed-demo.firebaseapp.com",
  projectId: "hellomed-demo",
  storageBucket: "hellomed-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);