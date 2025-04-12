// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDRo2lU-0Pi-Ze6pQvgglxbUZsuT05IRJU",
  authDomain: "hamo102.firebaseapp.com",
  databaseURL: "https://hamo102-default-rtdb.firebaseio.com",
  projectId: "hamo102",
  storageBucket: "hamo102.firebasestorage.app",
  messagingSenderId: "669360629660",
  appId: "1:669360629660:web:abba625473691b3a1bca59",
  measurementId: "G-CK9ERCWREY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export  {db};