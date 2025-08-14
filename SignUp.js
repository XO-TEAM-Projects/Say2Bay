// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvcfAnMcBMsxTGsvpKXomwFORzKJKvVls",
  authDomain: "xoweb-a1882.firebaseapp.com",
  databaseURL: "https://xoweb-a1882-default-rtdb.firebaseio.com",
  projectId: "xoweb-a1882",
  storageBucket: "xoweb-a1882.firebasestorage.app",
  messagingSenderId: "343983962558",
  appId: "1:343983962558:web:4c8c4c10e4d6200f37e1ef",
  measurementId: "G-KRET3GMYPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

// Get form elements
const UserName = document.getElementById("UserName");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const ConfirmPassword = document.getElementById("ConfirmPassword");
const SignUpButton = document.getElementById("sign");

// Sign up button click event
SignUpButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (Password.value !== ConfirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const dbRef = ref(database);

    // تحقق من تكرار اسم المستخدم
    const snapshot = await get(child(dbRef, 'users/' + UserName.value));
    if (snapshot.exists()) {
      alert("Username already taken. Please choose another one.");
      return;
    }

    // إنشاء مستخدم في Firebase Auth
    await createUserWithEmailAndPassword(auth, Email.value, Password.value);

    // تخزين البيانات مع البريد وكلمة المرور
    await set(ref(database, 'users/' + UserName.value), {
      email: Email.value,
      password: Password.value
    });

    console.log("User data stored under username:", UserName.value);

    // تحويل المستخدم لصفحة login
    window.location.href = "login.html";

  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
