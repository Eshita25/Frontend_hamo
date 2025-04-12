// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZLtBOpwaSWC9zywQcLGr8UnwBuzqUR-U",
  authDomain: "hamo-94122.firebaseapp.com",
  databaseURL: "https://hamo-94122-default-rtdb.firebaseio.com",
  projectId: "hamo-94122",
  storageBucket: "hamo-94122.firebasestorage.app",
  messagingSenderId: "90201662046",
  appId: "1:90201662046:web:4d148c2f0c621b33aa4acf",
  measurementId: "G-T1MBVVCD20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export  {db};