// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <--- Add this import for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmaoO6kmB8KkBqusYPN1tckCioX7B_8WA",
  authDomain: "siam-7cf7a.firebaseapp.com",
  projectId: "siam-7cf7a",
  storageBucket: "siam-7cf7a.firebasestorage.app",
  messagingSenderId: "655897812565",
  appId: "1:655897812565:web:7fda36bc0cc8a71b3cbedc",
  measurementId: "G-F62BQ2Q5HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // <--- Initialize and store the auth service

export { auth }; 