import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGM6-qMfRTKD9k5-QASLob2aEUjjfwXBo",
  authDomain: "puff-social-2026.firebaseapp.com",
  projectId: "puff-social-2026",
  storageBucket: "puff-social-2026.firebasestorage.app",
  messagingSenderId: "524294907137",
  appId: "1:524294907137:web:6f86b025ed3441ea00a700",
  measurementId: "G-8QVCJEMQPW",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
