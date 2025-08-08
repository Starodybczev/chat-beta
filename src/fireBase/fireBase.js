import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSZi3barU17rKreI2kF3zsWlFHru4p6hc",
  authDomain: "baseregform.firebaseapp.com",
  projectId: "baseregform",
  storageBucket: "baseregform.firebasestorage.app",
  messagingSenderId: "1042899624441",
  appId: "1:1042899624441:web:d11d60a8b9443ba5661d28",
  measurementId: "G-0GP7FLY3QT"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
