import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/sidebar.css"; // Ensure this CSS file exists

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      {/* Hamburger Toggle - Only Visible on Mobile */}
      <div className="sidebar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`bar bar--top ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar bar--middle ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar bar--bottom ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      {/* Sidebar Menu */}
      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <nav>
          <ul className="sidebar-links">
            <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
            <li><Link to="/add-waiter" onClick={() => setIsMenuOpen(false)}>Add Waiters</Link></li>
            <li><Link to="/view-waiters" onClick={() => setIsMenuOpen(false)}>View Waiters</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
