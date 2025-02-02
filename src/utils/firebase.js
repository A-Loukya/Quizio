// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyO0dt4-f6onA5qE6MjUQeKoVqsj5kbuM",
  authDomain: "quizio-8f029.firebaseapp.com",
  projectId: "quizio-8f029",
  storageBucket: "quizio-8f029.firebasestorage.app",
  messagingSenderId: "675645718048",
  appId: "1:675645718048:web:4b1feb2af71c0afbbc8645",
  measurementId: "G-K38M53RCCZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
