// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Do not Share config in Public.

const firebaseConfig = {
  apiKey: "AIzaSyCddV-DGmoPKxSk8SMX1dhVuBUJ24YFoxE",
  authDomain: "email-pass-authenticatio-1dd8e.firebaseapp.com",
  projectId: "email-pass-authenticatio-1dd8e",
  storageBucket: "email-pass-authenticatio-1dd8e.firebasestorage.app",
  messagingSenderId: "780451491637",
  appId: "1:780451491637:web:b267254698beb5bde5667c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);