import React, { useState } from "react";
import emailjs from "@emailjs/browser"; // ✅ Correct EmailJS import
import "../styles/contactUs.css";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // ✅ Status message for success/error

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await emailjs.send(
        "service_gfth8wb", // ✅ Your EmailJS Service ID
        "template_3qqpdxo", // ✅ Your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "hznIGYUp-x4X4lJrY" // ✅ Your EmailJS Public Key
      );

      toast("✅ Email sent successfully");

      // Clear form fields after successful submission
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast("❌ Error sending message:", error);
    }
  };

  return (
    <>
      <Navbar />
      <form className="colorful-form" onSubmit={handleSubmit}>
        <h2 className="heading">Contact Us</h2>

        <div className="form-group">
          <label className="form-label" htmlFor="name">Name:</label>
          <input
            required
            placeholder="Enter your name"
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email:</label>
          <input
            required
            placeholder="Enter your email"
            className="form-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Message:</label>
          <textarea
            required
            placeholder="Enter your message"
            className="form-input"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="form-button" type="submit">Submit</button>

        {/* Status Message */}
        {status && <p className="status-message">{status}</p>}
      </form>
      <Footer/>
    </>
  );
};

export default ContactUs;
