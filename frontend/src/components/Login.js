import React, { useState } from 'react';
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication
import { getDoc, doc } from "firebase/firestore"; // Firestore for fetching user details
import { db } from "../firebase/firebaseConfig"; // Import Firestore
import Footer from './Footer';


const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // For redirecting after login

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email && password) {
            const auth = getAuth();
            try {
                // Attempt to log in with email and password using Firebase Authentication
                await signInWithEmailAndPassword(auth, email, password);

                // Fetch user details from Firestore after successful authentication
                const userDocRef = doc(db, "users", auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    // Check if the email and password match (already handled by Firebase Auth)
                    toast.success("Login successful!");
                    setIsAuthenticated(true);
                    navigate('/dashboard'); // Redirect to homepage (or another page after login)
                } else {
                    toast.error("No user found in the database.");
                }
            } catch (error) {
                // Handle Firebase Authentication errors
                if (error.code === "auth/user-not-found") {
                    toast.error("No user found with this email.");
                } else if (error.code === "auth/wrong-password") {
                    toast.error("Incorrect password.");
                } else {
                    toast.error(`Error: ${error.message}`);
                }
            }
        } else {
            toast.error('Please enter both email and password');
        }
    };

    return (
        <>
        <div>
            <Navbar />
            <div className="form_main">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="inputContainer">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="inputField"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="inputField"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" id="button">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Login;
