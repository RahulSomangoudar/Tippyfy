import { addWaiterToFirestore, getWaitersFromFirestore } from "../../src/firebase/firebaseUtils";  // Importing from Firebase utils

// Add Waiter
export const addWaiter = async (waiter) => {
  await addWaiterToFirestore(waiter);
};

// Get Waiters
export const getWaiters = async () => {
  const waiters = await getWaitersFromFirestore();
  return waiters;
};
