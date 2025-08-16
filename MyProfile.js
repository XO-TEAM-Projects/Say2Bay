// نص الترحيب
const welcomeText = "Welcome to your personal page! Here you can see all your information such as your name, email, password, and phone number. To navigate between pages, press the S key and say the name of the page you want. To repeat this message, press the A key. To start shopping, just say 'add'.";

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

// جلب القيم من localStorage ووضعها في الحقول
document.addEventListener("DOMContentLoaded", () => {
  const storedPhone = localStorage.getItem("Phone")?.trim() || "";
  const storedEmail = localStorage.getItem("Email")?.trim().toLowerCase() || "";
  const storedPassword = localStorage.getItem("Password")?.trim() || "";
const storedUsername = localStorage.getItem("Username")?.trim() || "";
  const phoneInput = document.getElementById("PhoneNumber");
  const emailInput = document.getElementById("Email");
  const passwordInput = document.getElementById("Password");
  const usernameInput = document.getElementById("name");

  if (phoneInput) phoneInput.value = storedPhone;
  if (emailInput) emailInput.value = storedEmail;
  if (passwordInput) passwordInput.value = storedPassword;
  if (usernameInput) usernameInput.innerHTML = storedUsername;

  // لو ما فيه بريد إلكتروني → رجع المستخدم لصفحة تسجيل الدخول
  if (!storedEmail) {
    console.log("لا يوجد بريد إلكتروني مخزن → إعادة التوجيه للصفحة الرئيسية");
    window.location.href = "login.html";
    return;
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

      if (spokenTextS === "home") {
        window.location.href = "HomePage.html";
      } else if (spokenTextS === "favorites") {
        window.location.href = "MyFavorites.html";
      } else if (spokenTextS === "products") {
        window.location.href = "Products.html";
      } else if (spokenTextS === "back") {
        window.history.back();
      } else if (spokenTextS === "add") {
        window.location.href = "Products.html";
      } else {
        console.log("No matching page for:", spokenTextS);
      }
    });
  }
});
function out(){
  // Clear localStorage and redirect to login page
  localStorage.clear();
  window.location.href = "login.html";
};
