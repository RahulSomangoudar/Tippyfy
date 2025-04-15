import React, { useState, useEffect } from "react";
import "../styles/viewwaiter.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { toast } from "react-hot-toast"
import Footer from '../components/Footer';
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";

const ViewWaiter = () => {
  const [waiters, setWaiters] = useState([]);
  const [editingWaiterId, setEditingWaiterId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedUpiId, setUpdatedUpiId] = useState("");

  useEffect(() => {
    const fetchWaiters = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const waitersCollection = collection(db, "waiters");
        const q = query(waitersCollection, where("userId", "==", userId));

        const snapshot = await getDocs(q);
        const waitersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWaiters(waitersList);
      } catch (error) {
        toast("Error fetching waiters:", error);
      }
    };

    fetchWaiters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "waiters", id));
      setWaiters(waiters.filter(waiter => waiter.id !== id));
    } catch (error) {
      toast("Error deleting waiter:", error);
    }
  };

  const handleEdit = (waiter) => {
    setEditingWaiterId(waiter.id);
    setUpdatedName(waiter.name);
    setUpdatedUpiId(waiter.upiId);
  };

  const handleSaveEdit = async (id) => {
    try {
      const waiterRef = doc(db, "waiters", id);
      await updateDoc(waiterRef, { name: updatedName, upiId: updatedUpiId });

      setWaiters(waiters.map(waiter => (waiter.id === id ? { ...waiter, name: updatedName, upiId: updatedUpiId } : waiter)));
      setEditingWaiterId(null);
    } catch (error) {
      toast("Error updating waiter:", error);
    }
  };

  return (
    <div className="view-waiters">
      <Header />
      <Sidebar />
      <div className="content">
        <h2>Waiters</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>UPI ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {waiters.length === 0 ? (
                <tr>
                  <td colSpan="4">No waiters available</td>
                </tr>
              ) : (
                waiters.map(waiter => (
                  <tr key={waiter.id}>
                    <td>
                      <img src={waiter.imageUrl} alt={waiter.name} className="waiter-img" />
                    </td>
                    <td>
                      {editingWaiterId === waiter.id ? (
                        <input
                          type="text"
                          value={updatedName}
                          onChange={(e) => setUpdatedName(e.target.value)}
                        />
                      ) : (
                        waiter.name
                      )}
                    </td>
                    <td>
                      {editingWaiterId === waiter.id ? (
                        <input
                          type="text"
                          value={updatedUpiId}
                          onChange={(e) => setUpdatedUpiId(e.target.value)}
                        />
                      ) : (
                        waiter.upiId
                      )}
                    </td>
                    <td>
                      {editingWaiterId === waiter.id ? (
                        <div>
                          <button className="btn1" onClick={() => handleSaveEdit(waiter.id)}>Save</button>
                          <button className="btn1" onClick={() => setEditingWaiterId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <button className="btn1" onClick={() => handleEdit(waiter)}>Edit</button>
                          <button className="btn1" onClick={() => handleDelete(waiter.id)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewWaiter;
