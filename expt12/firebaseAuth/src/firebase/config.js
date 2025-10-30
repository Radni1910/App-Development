
// src/firebase/config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6upMSPP6zyW7Sw8DkFotrTfw2IKo-Vl8",
  authDomain: "fir-auth-f9aa3.firebaseapp.com",
  projectId: "fir-auth-f9aa3",
  storageBucket: "fir-auth-f9aa3.firebasestorage.app",
  messagingSenderId: "197631537891",
  appId: "1:197631537891:web:60f2ada5b72e34429e0bd6",
  measurementId: "G-6Y6KR8L7XR"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export default app;