// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO9I4UkjaQpfroqJREb4_5r2PabZIuWtY",
  authDomain: "coffeazy-auth.firebaseapp.com",
  projectId: "coffeazy-auth",
  storageBucket: "coffeazy-auth.appspot.com",
  messagingSenderId: "489283952863",
  appId: "1:489283952863:web:ffe963ed05ebacaa51c96a",
  measurementId: "G-YT0RYDD93V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
