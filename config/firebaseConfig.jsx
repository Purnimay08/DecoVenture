// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "campus-craving.firebaseapp.com",
  databaseURL: "https://campus-craving-default-rtdb.firebaseio.com",
  projectId: "campus-craving",
  storageBucket: "campus-craving.appspot.com",
  messagingSenderId: "772097211097",
  appId: "1:772097211097:web:7a0777302901ec78ebdcc8",
  measurementId: "G-TM9ZV852ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
