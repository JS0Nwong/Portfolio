import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Non sensitive firebase config
const firebaseConfig = {
  apiKey: "AIzaSyApYzUe8PnvSTKM44eHOSrcbR5OiRsxAUg",
  authDomain: "jasonwongtech.firebaseapp.com",
  projectId: "jasonwongtech",
  storageBucket: "jasonwongtech.appspot.com",
  messagingSenderId: "289259703753",
  appId: "1:289259703753:web:fe66d0626ec45a3d1b2c18",
  measurementId: "G-F2DR01Y6JN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
