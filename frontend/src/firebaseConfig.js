const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { getFirestore, collection, getDocs, addDoc, query, where, doc, deleteDoc } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCG4oVp1-vQMcju7Mt3MzDmyogbio-CooQ",
    authDomain: "tippy-fy.firebaseapp.com",
    projectId: "tippy-fy",
    storageBucket: "tippy-fy.firebasestorage.app",
    messagingSenderId: "883776598956",
    appId: "1:883776598956:web:103d7f24fc9d44dacb8009",
    measurementId: "G-7Z2MWK5D88"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection, getDocs, addDoc, query, where, doc, deleteDoc };
