// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVj5afn05jzQO_HUEmu9brBRapq8sVx50",
  authDomain: "todo-6d587.firebaseapp.com",
  projectId: "todo-6d587",
  storageBucket: "todo-6d587.firebasestorage.app",
  messagingSenderId: "65245388063",
  appId: "1:65245388063:web:af151d2a7ba10de9d6242a",
  measurementId: "G-CRBLLJVQ2G",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
