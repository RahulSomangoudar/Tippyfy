import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "../styles/waiter.css"; // Import CSS
import { toast } from "react-hot-toast";


const Waiters = () => {
  const { userId } = useParams(); 
  const [waiters, setWaiters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchWaiters = async () => {
      try {
        setError("");
        setLoading(true); // Show loader

        if (!userId) {
          setError("Invalid restaurant ID.");
          setLoading(false);
          return;
        }

        const q = query(collection(db, "waiters"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const waitersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWaiters(waitersList);
      } catch (error) {
        toast("Error fetching waiters");
        setError("Failed to load waiters. Please try again.");
      } finally {
        setLoading(false); // Hide loader after fetching
      }
    };

    fetchWaiters();
  }, [userId]);

  // UPI payment redirection
  const handlePay = (upiId) => {
    if (!upiId) {
      toast("No UPI ID available for this waiter.");
      return;
    }
    const upiUrl = `upi://pay?pa=${upiId}&pn=Waiter&cu=INR`;
    window.location.href = upiUrl; // Redirect to UPI payment
  };

  return (
    <div className="waiters-container">
      <h2>Waiters List</h2>

      {loading && <div className="loader"></div>} {/* Loader here */}

      {error && <p className="error">{error}</p>}
      
      {!loading && !error && waiters.length === 0 ? (
        <p>No waiters found.</p>
      ) : (
        <div className="waiters-grid">
          {waiters.map((waiter) => (
            <div key={waiter.id} className="waiter-card">
              <img 
                src={waiter.imageUrl || "https://via.placeholder.com/150"} 
                alt={waiter.name} 
                className="waiterimg"
              />
              <h3 className="waiter-name">{waiter.name}</h3>
              <button className="pay-button" onClick={() => handlePay(waiter.upiId)}>
                Pay Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Waiters;
