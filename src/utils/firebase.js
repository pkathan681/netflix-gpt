// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhA-OZ1b-GjWF6N-xPw0C050_iOlHEu6Q",
  authDomain: "netflixgpt-45952.firebaseapp.com",
  projectId: "netflixgpt-45952",
  storageBucket: "netflixgpt-45952.appspot.com",
  messagingSenderId: "106547881016",
  appId: "1:106547881016:web:71e9a31f086e85039a32cd",
  measurementId: "G-55ETVXBMNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();