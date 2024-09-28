import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAy9AqOQ_iMqi5umjTThAVEm75RtDaDmng",
  authDomain: "ecommerce-e61b0.firebaseapp.com",
  databaseURL: "https://ecommerce-e61b0-default-rtdb.firebaseio.com",
  projectId: "ecommerce-e61b0",
  storageBucket: "ecommerce-e61b0.appspot.com",
  messagingSenderId: "697780631906",
  appId: "1:697780631906:web:8432201eb75495ffa4143b",
  measurementId: "G-1NHD1PLS3H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
