// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blog-app-aafad.firebaseapp.com",
  projectId: "blog-app-aafad",
  storageBucket: "blog-app-aafad.appspot.com",
  messagingSenderId: "920673291351",
  appId: "1:920673291351:web:62cd2c554f6957985fe712",
  measurementId: "G-1NX96H7NGV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
