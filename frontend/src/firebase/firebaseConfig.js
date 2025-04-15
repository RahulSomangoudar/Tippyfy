import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCG4oVp1-vQMcju7Mt3MzDmyogbio-CooQ",
  authDomain: "tippy-fy.firebaseapp.com",
  databaseURL: "https://tippy-fy-default-rtdb.firebaseio.com",
  projectId: "tippy-fy",
  storageBucket: "tippy-fy.firebasestorage.app",
  messagingSenderId: "883776598956",
  appId: "1:883776598956:web:103d7f24fc9d44dacb8009",
  measurementId: "G-7Z2MWK5D88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
