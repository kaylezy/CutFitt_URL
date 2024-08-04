// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSYlZLzC6hs8u6uKxDfj81Bbu2ms6jDH4",
  authDomain: "cutfiturl-511af.firebaseapp.com",
  projectId: "cutfiturl-511af",
  storageBucket: "cutfiturl-511af.appspot.com",
  messagingSenderId: "190770634669",
  appId: "1:190770634669:web:0b90b8e672bf5cb240cb24",
  measurementId: "G-CNDEJFJ937",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { firestore, auth, analytics, app };
export const googleAuthProvider = new GoogleAuthProvider();
