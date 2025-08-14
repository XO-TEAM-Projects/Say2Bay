  // Firebase imports
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
  import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBUfbXvYE0iITgQRjSic6ZCEShp-32Y-oU",
    authDomain: "say2bay.firebaseapp.com",
    databaseURL: "https://say2bay-default-rtdb.firebaseio.com",
    projectId: "say2bay",
    storageBucket: "say2bay.firebasestorage.app",
    messagingSenderId: "41381523374",
    appId: "1:41381523374:web:778f49cff3356fbc5c223f",
    measurementId: "G-RGP1T35K3W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db = getFirestore(app);

  // Elements
  const usernameInput = document.getElementById("UserName");
  const emailInput = document.getElementById("Email");
  const passwordInput = document.getElementById("Password");
  const confirmPasswordInput = document.getElementById("ConfirmPassword");
  const signUpButton = document.getElementById("sign");

  signUpButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!username || !email || !password || !confirmPassword) {
      alert("يرجى تعبئة جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    try {
      // التحقق إذا كان username موجود
      const userRef = doc(db, "users", username);
      const existingUser = await getDoc(userRef);
      if (existingUser.exists()) {
        alert("اسم المستخدم مستخدم بالفعل");
        return;
      }

      // تسجيل المستخدم في Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // تخزين البيانات في Firestore
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        username: username,
        email: email,
        createdAt: new Date().toISOString()
      });

      alert("تم التسجيل بنجاح! سيتم تحويلك لصفحة تسجيل الدخول");
      window.location.href = "login.html";

    } catch (error) {
      console.error(error);
      alert("حدث خطأ: " + error.message);
    }
  });