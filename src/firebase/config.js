// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "mostafa-firegram.firebaseapp.com",
  projectId: "mostafa-firegram",
  storageBucket: "mostafa-firegram.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Access Firebase Storage using a variable
const projectStorage = getStorage(app);

// Access Firestore using a variable
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
