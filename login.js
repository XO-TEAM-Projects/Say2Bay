// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

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
const database = getDatabase(app);

// عناصر الإدخال
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const button = document.getElementById("login");

button.addEventListener("click", (e) => {
  e.preventDefault();

  const email = Email.value.trim();
  const password = Password.value.trim();

  if (email === "" || password === "") {
    alert("رجاءً أدخل جميع البيانات");
    return;
  }

  // مرجع لمسار المستخدمين في قاعدة البيانات
  const usersRef = ref(database, "users");

  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let found = false;

        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();

          if (userData.email === email && userData.password === password) {
            found = true;
          }
        });

        if (found) {
          // إذا البيانات موجودة → روح على home page
          window.location.href = "HomePage.html";
        } else {
           location.reload();
          alert("الإيميل أو كلمة المرور غير صحيحة");
        }
      } else {
         location.reload();
        alert("لا يوجد أي مستخدمين في قاعدة البيانات");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("حدث خطأ أثناء التحقق من البيانات");
    });
});
