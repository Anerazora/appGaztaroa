// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD19faNvU8hVoMpSzLppbHxMJy8PfBdHbY",
  authDomain: "appgaztaroa-53ec5.firebaseapp.com",
  databaseURL: "https://appgaztaroa-53ec5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appgaztaroa-53ec5",
  storageBucket: "appgaztaroa-53ec5.appspot.com",
  messagingSenderId: "750197807379",
  appId: "1:750197807379:web:ac15b99608637a443762e6",
  measurementId: "G-5NHR2QKDVL",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app;