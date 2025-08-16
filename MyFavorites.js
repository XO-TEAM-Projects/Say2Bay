const welcomeText = `
Welcome to Say2buy Favorites page! 
Here you can see all your saved products arranged in rows. 
To navigate and control the page using your voice, press the S key. 
To repeat this message, press the A key. 
To start shopping, just say 'add'. 
To remove a row, press S and say 'remove row' followed by the row number.
To restore a row, press S and say 'add row' followed by the row number.
`;


const row1 = document.getElementById("one");
const row2 = document.getElementById("two");
const row3 = document.getElementById("three");
const row4 = document.getElementById("four");
const row1display = getComputedStyle(row1).display;
const row2display = getComputedStyle(row2).display;
const row3display = getComputedStyle(row3).display;
const row4display = getComputedStyle(row4).display;

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
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
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
      } else if (spokenTextS === "home") {
        window.location.href = "HomePage.html";
      } else if (spokenTextS === "products") {
        window.location.href = "Products.html";
      } else if (spokenTextS === "back") {
        window.history.back();
      } else if (
        spokenTextS === "add row one" ||
        spokenTextS === "add row 1" ||
        spokenTextS === "add raw 1" ||
        spokenTextS === "add raw one"
      ) {
        row1.style.display = row1display;
        row1.classList.remove("hide");
      } else if ( 
        spokenTextS === "add row two" ||
        spokenTextS === "add row 2" ||
        spokenTextS === "add raw 2" ||
        spokenTextS === "add raw two") {
        row2.style.display = row2display;
        row2.classList.remove("hide");
      } else if ( 
        spokenTextS === "add row three" ||
        spokenTextS === "add row 3" ||
        spokenTextS === "add raw 3" ||
        spokenTextS === "add raw three") {
        row3.style.display = row3display;
        row3.classList.remove("hide");
      } else if ( 
        spokenTextS === "add row four" ||
        spokenTextS === "add row 4" ||
        spokenTextS === "add raw 4" ||
        spokenTextS === "add raw four") {
        row4.style.display = row4display;
        row4.classList.remove("hide");
      } else if (
        spokenTextS === "remove row one" ||
        spokenTextS === "remove row 1" ||
        spokenTextS === "remove raw 1" ||
        spokenTextS === "remove raw one") {
        row1.style.display = "none";
      } else if (
        spokenTextS === "remove row two" ||
        spokenTextS === "remove row 2" ||
        spokenTextS === "remove raw 2" ||
        spokenTextS === "remove raw two") {
           row2.style.display = "none";
      } else if (
        spokenTextS === "remove row three" ||
        spokenTextS === "remove row 3" ||
        spokenTextS === "remove raw 3" ||
        spokenTextS === "remove raw three") {
        row3.style.display = "none";
      } else if (
        spokenTextS === "remove row four" ||
        spokenTextS === "remove row 4" ||
        spokenTextS === "remove raw 4" ||
        spokenTextS === "remove raw four") {
        row4.style.display = "none";
      }
      else if(spokenTextS === "add") {
        window.location.href = "Products.html";
    }
       else {
        console.log("No matching page for:", spokenTextS);
      }
    });
  }
});
