
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChKL0_zJVDoEz17pVEEmM5SYCQu_CxXzk",
  authDomain: "task-msnsger.firebaseapp.com",
  projectId: "task-msnsger",
  storageBucket: "task-msnsger.firebasestorage.app",
  messagingSenderId: "1084864662031",
  appId: "1:1084864662031:web:c37a872af961ea795b317a",
  measurementId: "G-5JE8HCGF3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

export default app;
