// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA6R31CeIVAc6SHEGoEmfCyofLOLuvmfU",
  authDomain: "panaderiatec-eecb5.firebaseapp.com",
  projectId: "panaderiatec-eecb5",
  storageBucket: "panaderiatec-eecb5.firebasestorage.app",
  messagingSenderId: "1054983164007",
  appId: "1:1054983164007:web:dc39ebdeefa6417090c4c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);