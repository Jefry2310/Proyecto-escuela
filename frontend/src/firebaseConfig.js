// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <--- Add this import for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA84ebjlxbPggtaoz8VucXZW-dp--iTm28",
  authDomain: "escuela-proyecto-unah.firebaseapp.com",
  projectId: "escuela-proyecto-unah",
  storageBucket: "escuela-proyecto-unah.firebasestorage.app",
  messagingSenderId: "399761542806",
  appId: "1:399761542806:web:4c94d8a1adbb9646f7bcb7",
  measurementId: "G-XTB7GE7L41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // <--- Initialize and store the auth service

export { auth }; 