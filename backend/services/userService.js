import { db } from "../../src/firebase/firebaseConfig";  // Importing from frontend Firebase config
import { doc, updateDoc } from "firebase/firestore";

// Update User Profile
export const updateUserProfile = async (userId, profileData) => {
  const userDoc = doc(db, "users", userId);
  try {
    await updateDoc(userDoc, profileData);
    console.log("Profile updated!");
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
};
