import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/welcome.css"; // Import your CSS file
import Navbar from '../components/Navbar';
import Footer from "./Footer";

const Welcome = () => {
  const text = "Welcome to Tippyfy";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // Speed of typing (ms)
  const erasingSpeed = 100; // Speed of erasing (ms)
  const delayBeforeErasing = 5000; // Delay before erasing (ms)

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && index < text.length) {
        // Typing effect
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        // Erasing effect
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      } else if (!isDeleting && index === text.length) {
        // Delay before erasing
        setTimeout(() => setIsDeleting(true), delayBeforeErasing);
      } else if (isDeleting && index === 0) {
        // Restart typing
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? erasingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [index, isDeleting, text]);

  return (
    <>
      <Navbar />
      <div className="welcome-container">
        <h1>
          {displayText}
          <span className="cursor">|</span>
        </h1>
        <h3>Discover a new way to appreciate service.</h3>
        <div className="btn-group">
          <Link to="/signup" className="btn">Sign Up</Link>
          <Link to="/login" className="btn">Login</Link>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Welcome;
