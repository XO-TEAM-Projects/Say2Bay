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

// Input elements
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const button = document.getElementById("login");
const usernameInput = document.getElementById("Username");

// Text to speak
const welcomeText= "Welcome to Say2buy! This page allows users to log in by entering their username, email, and password. It also supports speech recognition for input fields and provides a spoken welcome message on first interaction.";

// Flag for first read
let firstRead = false;

// Function to speak text
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// First mouse click anywhere → read welcome text
document.addEventListener("click", () => {
  if (!firstRead) {
    speakText(welcomeText);
    firstRead = true;
  }
});

// Function to start speech recognition for any input
function recognizeSpeech(targetInput, fieldType) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // يمكن تغييره للعربي
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.addEventListener("result", (event) => {
      const spokenText = event.results[0][0].transcript;
      targetInput.value = spokenText; // يظهر النص مباشرة في المربع
      console.log(`${fieldType} spoken text:`, spokenText);
    });

    recognition.addEventListener("error", (event) => {
      console.error("Speech recognition error:", event.error);
    });

    recognition.start();
    console.log(`Listening for ${fieldType}...`);
  } else {
    alert("Speech recognition is not supported in this browser.");
  }
}

// Keydown events
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "a") speakText(welcomeText);
  if (key === "u") recognizeSpeech(usernameInput, "username");
  if (key === "e") recognizeSpeech(Email, "email");
  if (key === "p") recognizeSpeech(Password, "password");
});

// Login button logic with verification
button.addEventListener("click", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = Email.value.trim();
  const password = Password.value.trim();
  if (!username || !email || !password) {
    alert("Please enter all fields.");
    return;
  }
  localStorage.setItem("Email", email);
  localStorage.setItem("Password", password);
  localStorage.setItem("Phone", "0788678126"); 
  localStorage.setItem("Username", username);
  // Example phone number
  // Username is primary key
  const userRef = ref(database, `users/${username}`);

  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();

        // تحقق من email و password
        if (userData.email === email && userData.password === password) {
          window.location.href = "HomePage.html";
        } else {
          alert("Email or password is incorrect for this username.");
        }
      } else {
        alert("Username does not exist.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while verifying the data.");
    });
});
