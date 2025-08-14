import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUfbXvYE0iITgQRjSic6ZCEShp-32Y-oU",
  authDomain: "say2bay.firebaseapp.com",
  databaseURL: "https://say2bay-default-rtdb.firebaseio.com",
  projectId: "say2bay",
  storageBucket: "say2bay.firebasestorage.app",
  messagingSenderId: "41381523374",
  appId: "1:41381523374:web:778f49cff3356fbc5c223f",
  measurementId: "G-RGP1T35K3W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
