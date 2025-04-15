import { auth } from "../../src/firebase/firebaseConfig";  // Importing from the frontend Firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Register User
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
