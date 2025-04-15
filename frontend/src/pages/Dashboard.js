import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { getDoc, doc } from "firebase/firestore"; // Firestore
import { db } from "../firebase/firebaseConfig"; // Firebase config
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../components/Footer"
import "../styles/dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState(""); // State for storing user name
  const auth = getAuth(); // Firebase Authentication instance

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch user document from Firestore
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserName(userDoc.data().username); // Set username from Firestore
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        setUserName(""); // Reset user name if no user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  return (
    <div className="dashboard">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <h2>Welcome {userName ? userName : "to your dashboard"}!</h2>
          <p>Use the navigation links on the left </p>
          <p>to manage your restaurant's waiters.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
