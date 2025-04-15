import React from "react";
import Navbar from "../components/Navbar";
import "../styles/about.css"; // Ensure this CSS file exists for styling
import Footer from "./Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      {/* About Section */}
      <section className="about-container">
        <h1>About Tippify</h1>
        <p>
          At <strong>Tippify</strong>, we believe in making the tipping experience seamless, fair, and efficient for both restaurant staff and customers.
          Our platform simplifies tip distribution, ensuring transparency, accuracy, and ease of use for restaurant owners, waitstaff, and managers.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to revolutionize the way tips are managed in the hospitality industry. 
          By leveraging technology, we aim to create a system where every hard-working employee is fairly rewarded for their efforts.
        </p>

        <h2>Why Choose Tippify?</h2>
        <ul>
          <li><strong>Fair Tip Distribution:</strong> Ensure tips are divided accurately and fairly among staff members.</li>
          <li><strong>Seamless Digital Payments:</strong> Customers can tip directly through digital platforms, reducing cash dependency.</li>
          <li><strong>Real-Time Tracking:</strong> Staff members can track their earnings transparently in real-time.</li>
          <li><strong>Easy Integration:</strong> Works smoothly with existing restaurant management systems.</li>
        </ul>

        <h2>Join Us in Redefining Tipping</h2>
        <p className="last" >
          Whether you’re a restaurant owner, a waiter, or a customer who believes in fair rewards, Tippify is here to transform the way we tip. 
          Join us in creating a more transparent and efficient tipping culture.
        </p>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
