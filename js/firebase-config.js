// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "truckinity.firebaseapp.com",
  projectId: "truckinity",
  storageBucket: "truckinity.appspot.com",
  messagingSenderId: "150787942012",
  appId: "1:150787942012:web:47214cfb6f3fb1c66c0bf9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
