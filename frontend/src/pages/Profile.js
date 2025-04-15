import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            toast("No user found in the database.");
          }
        } catch (error) {
          toast("Error fetching user data");
        }
      } else {
        toast("User not authenticated.");
      }
    };

    fetchUserData();
  }, [auth]);

  const handleDownloadQRCode = () => {
    if (user && user.qrCodeUrl) {
      // Modify the Cloudinary URL to force download
      const downloadUrl = user.qrCodeUrl.replace("/upload/", "/upload/fl_attachment/");
  
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "tippyfy_QR_Code.png"; // Sets default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast("QR Code URL not available.");
    }
  };
  
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="profile-content">
        {user && (
          <div className="qr-container" id="qr-container">
            <img src={user.qrCodeUrl} alt="QR Code" className="qr-code" />
            <button className="qr-download-btn" onClick={handleDownloadQRCode}>
              Download QR Code
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
