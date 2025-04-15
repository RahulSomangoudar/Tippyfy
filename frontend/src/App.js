import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast"; 
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import About from './components/About';
import Dashboard from './pages/Dashboard';
import AddWaiter from './pages/AddWaiter';
import ViewWaiter from './pages/ViewWaiter';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
import Waiters from './pages/Waiters';
import "./App.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate a login check (replace with actual authentication logic)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
    <Router>
      <div>
      <Toaster position="top-right" reverseOrder={false} />
          <Routes>
          <Route path="/" element={<Welcome />} /> {/* Welcome page for all users */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-waiter" element={<AddWaiter />} />
          <Route path="/view-waiters" element={<ViewWaiter />} />
          <Route path="/header" element={<Header />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/waiters/:userId" element={<Waiters />} />
          {/* Allow access to Dashboard and other pages */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
