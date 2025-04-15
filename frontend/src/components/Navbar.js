import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure correct path
import "../styles/navbar.css"; // Ensure this CSS file exists

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // For navigation

  return (
    <nav className="navbar">
      {/* Logo (Redirects to Home) */}
      <img src={logo} alt="Tippify Logo" className="logo-img" onClick={() => navigate("/")} />

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Hamburger Menu */}
      <input
        type="checkbox"
        id="checkbox"
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
      />
      <label className="toggle" htmlFor="checkbox">
        <div className="bar bar--top"></div>
        <div className="bar bar--middle"></div>
        <div className="bar bar--bottom"></div>
      </label>
    </nav>
  );
};

export default Navbar;
