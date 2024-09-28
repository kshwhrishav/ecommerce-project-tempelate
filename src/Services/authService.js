// authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Register user and assign role
export const registerUser = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role,
    });

    console.log('User registered with role:', role);
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    return { user, role: userData.role };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
