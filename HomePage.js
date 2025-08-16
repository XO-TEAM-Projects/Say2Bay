import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Firebase config
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

document.addEventListener("DOMContentLoaded", () => {
  const emailToCheck = localStorage.getItem("Email")?.trim().toLowerCase(); 

  if (!emailToCheck) {
    console.log("لا يوجد بريد إلكتروني مخزن → إعادة التوجيه للصفحة الرئيسية");
    window.location.href = "login.html";
    return;
  }

  const dbRef = ref(database, "users");
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        let emailFound = false;

        for (const key in users) {
          if (users[key].email && users[key].email.trim().toLowerCase() === emailToCheck) {
            emailFound = true;
            console.log("البريد الإلكتروني موجود ✅ الصفحة تعمل عادي");

            // تحديث بيانات الحساب عند الدخول
            const userRef = ref(database, `users/${key}`);
            update(userRef, {
           Fruitbowl:0,
           Hotdog:0,
           Pizza:0,
           lemonada:0,
           Sandwich:0,
           PotatoFries:0,
           grilledchicken:0,
           DoubleBeefBurger:0,
           croissant:0,
           CherryCupcake:0,
            matcha:0,
            Strawberrysmoothie:0,
            Shawarma:0,
            paprikachips:0,
            Pinklemonade:0,
            Cookies:0,
            orangejuice:0,
            BologneseSpaghetti:0,
            Sushi:0,
            phone:"0788678126"
            })
              .then(() => {
                console.log("تم تحديث بيانات المستخدم بنجاح ✅");
                
              })
              .catch((err) => {
                console.error("خطأ أثناء التحديث:", err);
              });

            initPage(users[key]);
            break;
          }
        }

        if (!emailFound) {
          console.log("البريد الإلكتروني غير موجود → إعادة التوجيه للصفحة الرئيسية");
          window.location.href = "login.html";
        }
      } else {
        console.log("لا يوجد أي مستخدمين في الداتابيس → إعادة التوجيه للصفحة الرئيسية");
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.error("خطأ في جلب البيانات من Firebase:", error);
      window.location.href = "login.html";
    });
});

function initPage(userData) {
  console.log("الصفحة جاهزة للاستخدام ✨");
  console.log("بيانات المستخدم:", userData);

  const emailElement = document.getElementById("displayEmail");
  if (emailElement) emailElement.textContent = userData.email || "No email found";
}

// نص الترحيب
const welcomeText = "Welcome to Say2buy! This page allows users to navigate and interact using their voice. To speak and control the page, press the S key. To repeat the welcome message, press the A key. To start shopping, just say 'add'.";


// علامة لتأكيد القراءة الأولى
let firstRead = false;

// متغير لتخزين الصوت المسجل عند الضغط على S
let spokenTextS = "";

// دالة لتشغيل النص صوتياً
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// عند أول نقرة → قراءة نص الترحيب
document.addEventListener("click", () => {
  if (!firstRead) {
    speakText(welcomeText);
    firstRead = true;
  }
});

// دالة لتسجيل الصوت لأي مدخل
function recognizeSpeech(targetInput, callback) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("result", (event) => {
      const spokenText = event.results[0][0].transcript.trim();
      if (targetInput) targetInput.value = spokenText;
      console.log("Recorded speech:", spokenText);
      if (callback) callback(spokenText);
    });

    recognition.addEventListener("error", (event) => {
      console.error("Speech recognition error:", event.error);
    });

    recognition.start();
    console.log("Listening for speech...");
  } else {
    alert("Speech recognition is not supported in this browser.");
  }
}

// الاستماع لضغطات الكيبورد
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "a") {
    speakText(welcomeText);
  }

  if (key === "s") {
    recognizeSpeech(null, (text) => {
      spokenTextS = text.toLowerCase();

      if (spokenTextS === "profile") {
        window.location.href = "MyProfile.html";
      } else if (spokenTextS === "favorites") {
        window.location.href = "MyFavorites.html";
      } else if (spokenTextS === "products") {
        window.location.href = "Products.html";
      }else if( spokenTextS=== "back"){
        window.history.back();
      } else if( spokenTextS === "add") {
        window.location.href = "Products.html";
      }
      else {
        console.log("No matching page for:", spokenTextS);
      }
    });
  }
});
