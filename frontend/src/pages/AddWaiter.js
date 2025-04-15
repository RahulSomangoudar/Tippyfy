import React, { useState } from "react";
import axios from "axios";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/addWaiter.css";
import { toast } from "react-hot-toast";
import Footer from '../components/Footer';


const AddWaiter = () => {
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        toast("You must be logged in to add a waiter.");
        return;
      }

      const userId = auth.currentUser.uid;

      if (!image) {
        toast("Please select an image.");
        return;
      }

      // Upload image to Cloudinary
      const cloudinaryUrl = "https://api.cloudinary.com/v1_1/duis6646o/image/upload";
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "waiter_image_upload");
      formData.append("cloud_name", "duis6646o");

      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.secure_url;

      // Firestore: Store waiter under the "waiters" collection
      const waiterRef = doc(collection(db, "waiters"));
      await setDoc(waiterRef, {
        id: waiterRef.id,
        name,
        upiId,
        imageUrl,
        userId,
        createdAt: new Date(),
      });

      toast("Waiter added successfully!");
      navigate("/view-waiters");
    } catch (error) {
      toast("Failed to add waiter. Please check permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-waiter-page">
      <Header />
      <div className="main">
        <Sidebar />
        <section className="content">
          <div className="form">
            <h2 className="heading">Add Waiter</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputContainer">
                <input
                  className="inputField"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter waiter's name"
                  required
                />
              </div>
              <div className="inputContainer">
                <input
                  className="inputField"
                  type="text"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID"
                  required
                />
              </div>
              <div className="inputContainer">
                <input
                  className="inputField"
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
              <button
                id="button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding Waiter..." : "Add Waiter"}
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
};

export default AddWaiter;
