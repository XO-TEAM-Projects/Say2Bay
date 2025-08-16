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

// Form elements
const UserName = document.getElementById("UserName");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const ConfirmPassword = document.getElementById("ConfirmPassword");
const SignUpButton = document.getElementById("sign");
const chatBox = document.getElementById('chatBox');

// Text explanation
const explanationText = "Welcome to Say2Buy! This page lets you sign up using your voice. Press 'u' for username, 'e' for email, and 'p' for password. Press 'a' anytime to hear this guide again. After filling your info, click Sign-Up to save your account in Firebase.";

let hasInteracted = false;
let usernameFromVoice = "";
let emailFromVoice = "";
let passwordFromVoice = "";

// Function to validate email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

// Speak function
function speakText() {
  const utterance = new SpeechSynthesisUtterance(explanationText);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 0.9;
  speechSynthesis.speak(utterance);

  if (chatBox) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'botMsg';
    msgDiv.textContent = explanationText;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// First mouse interaction
window.addEventListener('mousedown', () => {
  if (!hasInteracted) {
    speakText();
    hasInteracted = true;
  }
});

// Helper function to setup voice recognition
function setupVoiceRecognition(targetInput, jsVariableCallback, extraCallback) {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => console.log(`Voice recording started for ${targetInput.id}...`);

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      targetInput.value = transcript;
      jsVariableCallback(transcript);
      if (extraCallback) extraCallback(transcript);
      console.log(`${targetInput.id} set from voice:`, transcript);
    };

    rec.onerror = (event) => {
      console.error(`Speech recognition error for ${targetInput.id}:`, event.error);
      alert("Error capturing voice. Please try again.");
    };

    rec.onend = () => console.log(`Voice recording ended for ${targetInput.id}.`);
    return rec;
  } else {
    alert("Your browser does not support Web Speech API");
  }
}

// Voice recognition objects
let usernameRecognition = setupVoiceRecognition(UserName, val => usernameFromVoice = val);
let emailRecognition = setupVoiceRecognition(Email, val => emailFromVoice = val);
let passwordRecognition = setupVoiceRecognition(Password, val => passwordFromVoice = val, val => ConfirmPassword.value = val);

// Keydown events
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  if (key === 'a' && hasInteracted) speakText();
  else if (key === 'u' && usernameRecognition) usernameRecognition.start();
  else if (key === 'e' && emailRecognition) emailRecognition.start();
  else if (key === 'p' && passwordRecognition) passwordRecognition.start();
});

// SignUp click
SignUpButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (Password.value !== ConfirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  const finalUserName = (usernameFromVoice || UserName.value).trim();
  const finalEmail = (emailFromVoice || Email.value).trim();
  const finalPassword = passwordFromVoice || Password.value;

  // Validate email format
  if (!isValidEmail(finalEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    const dbRef = ref(database);

    const snapshot = await get(child(dbRef, 'users/' + finalUserName));
    if (snapshot.exists()) {
      alert("Username already taken. Please choose another one.");
      return;
    }

    await createUserWithEmailAndPassword(auth, finalEmail, finalPassword);

    await set(ref(database, 'users/' + finalUserName), {
      email: finalEmail,
      password: finalPassword
    });

    console.log("User data stored under username:", finalUserName);
    window.location.href = "login.html";

  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
