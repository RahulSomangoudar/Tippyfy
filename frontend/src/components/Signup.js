import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signup.css";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import QRCode from "qrcode";
import axios from "axios";
import Footer from "./Footer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      // Generate QR code linking to the restaurant's waiter page
      const qrCodeUrl = `https://tippy-fy.web.app/waiters/${userId}`;
      const qrCodeBase64 = await QRCode.toDataURL(qrCodeUrl);

      // Convert Base64 to Blob for uploading
      const byteString = atob(qrCodeBase64.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: "image/png" });

      // Upload QR Code to Cloudinary
      const formData = new FormData();
      formData.append("file", blob, "qr_code.png");
      formData.append("upload_preset", "user_qr_code");

      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duis6646o/image/upload", formData);
      const uploadedQrCodeUrl = uploadRes.data.secure_url;

      // Store user data in Firestore
      await setDoc(doc(db, "users", userId), {
        username: username,
        email: email,
        createdAt: new Date(),
        qrCodeUrl: uploadedQrCodeUrl, // Store the hosted QR code URL
      });

      toast.success("Signup successful! Redirecting...");
      window.location.href = "/login";
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form_main2">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="inputContainer">
            <input
              type="text"
              id="name"
              name="username"
              className="inputField"
              placeholder="Enter your username"
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button type="submit" id="button">Signup</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
