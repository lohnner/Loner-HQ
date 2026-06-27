// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfHLrtPMnLtfU-PvsVf5QCOXKmuZya51I",
  authDomain: "loner-hq.firebaseapp.com",
  projectId: "loner-hq",
  storageBucket: "loner-hq.firebasestorage.app",
  messagingSenderId: "290842361996",
  appId: "1:290842361996:web:f1010f32a520a7148f7ba9",
  measurementId: "G-0X2Y1KQFEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);