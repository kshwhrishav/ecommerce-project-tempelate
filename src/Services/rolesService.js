// roleService.js
import { db } from '../firebase/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

// Update user role
export const updateUserRole = async (uid, newRole) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { role: newRole });
    console.log(`User role updated to ${newRole}`);
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

// Fetch user role
export const fetchUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.data().role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};
