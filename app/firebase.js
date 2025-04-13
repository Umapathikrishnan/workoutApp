import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3l3xIS_dikjkJ-73KIfekEMFk8kmS0e8",
  authDomain: "fittrack-12fed.firebaseapp.com",
  projectId: "fittrack-12fed",
  storageBucket: "fittrack-12fed.appspot.com",
  messagingSenderId: "132347251188",
  appId: "1:132347251188:web:93d0a87ac58439045cd1a1",
  measurementId: "G-PSH8CPFBTQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
