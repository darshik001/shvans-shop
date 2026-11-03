// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeH8SssDLeu5Ggbj8toClBq2zGE-6Ku-c",
  authDomain: "nehdo-23bd4.firebaseapp.com",
  projectId: "nehdo-23bd4",
  storageBucket: "nehdo-23bd4.firebasestorage.app",
  messagingSenderId: "784435496062",
  appId: "1:784435496062:web:c50536275ff566ea93442f"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);