import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Add Waiter to Firestore
export const addWaiterToFirestore = async (waiter) => {
  try {
    const docRef = await addDoc(collection(db, "waiters"), waiter);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Fetch All Waiters from Firestore
export const getWaitersFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "waiters"));
    const waiters = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return waiters;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};
