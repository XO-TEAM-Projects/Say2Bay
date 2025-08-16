const fruitBowl = document.getElementById("fruit-bowl");
const hotdog = document.getElementById("hotdog");
const pepperoniPizza = document.getElementById("pepperoni-pizza");
const lemonada = document.getElementById("lemonada");
const sandwich = document.getElementById("sandwich");
const potatoFries = document.getElementById("potato-fries");
const grilledChicken = document.getElementById("grilled-chicken");
const doubleBeefBurger = document.getElementById("double-beef-burger");
const croissant = document.getElementById("croissant");
const cherryCupcake = document.getElementById("cherry-cupcake");
const matcha = document.getElementById("matcha");
const strawberrySmoothie = document.getElementById("strawberry-smoothie");
const shawarma = document.getElementById("shawarma");
const paprikaChips = document.getElementById("paprika-chips");
const pinkLemonade = document.getElementById("pink-lemonade");
const cookies = document.getElementById("cookies");
const orangeJuice = document.getElementById("orange-juice");
const bologneseSpaghetti = document.getElementById("bolognese-spaghetti");
const sushi = document.getElementById("sushi");
const pastaInTomatoSauce = document.getElementById("pasta-in-tomato-sauce");
const riceWithMeat = document.getElementById("rice-with-meat");
const icedCoffeeMoca = document.getElementById("iced-coffee-moca");
const grilledSteakAndPotatoes = document.getElementById("grilled-steak-and-potatoes");
const saladBowlVegetable = document.getElementById("salad-bowl-vegetable");
const salmon = document.getElementById("salmon");
const riceWithChicken = document.getElementById("rice-with-chicken");
const classicBurger = document.getElementById("classic-burger");
const friedChickenWithFrenchFries = document.getElementById("fried-chicken-with-french-fries");
const randonDrinks = document.getElementById("randon-drinks");
const friedChicken = document.getElementById("fried-chicken");
const allDrinksFood = document.getElementById("allDrinkFood");
const drink = document.getElementById("drink");
const food = document.getElementById("food");
// ...existing code...
allDrinksFood.addEventListener("click",function(e){ 
  e.preventDefault();
  const elements = [
    fruitBowl, hotdog, pepperoniPizza, lemonada, sandwich, potatoFries, grilledChicken,
    doubleBeefBurger, croissant, cherryCupcake, matcha, strawberrySmoothie, shawarma,
    paprikaChips, pinkLemonade, cookies, orangeJuice, bologneseSpaghetti, sushi,
    pastaInTomatoSauce, riceWithMeat, icedCoffeeMoca, grilledSteakAndPotatoes,
    saladBowlVegetable, salmon, riceWithChicken, classicBurger,
    friedChickenWithFrenchFries, randonDrinks, friedChicken
  ];
  elements.forEach(el => {
    if (el) {
     el.classList.remove("show", "hide");
    el.classList.add("show");
      
    }
  });
});
// ...existing code...
// ...existing code...

 drink.addEventListener("click", function(e) {
  e.preventDefault();
  // List of drink element variables (update this list with your drink IDs)
  const drinks = [
    matcha, strawberrySmoothie, pinkLemonade, orangeJuice, icedCoffeeMoca, randonDrinks, lemonada
  ];

  const allItems = [
    fruitBowl, hotdog, pepperoniPizza, lemonada, sandwich, potatoFries, grilledChicken,
    doubleBeefBurger, croissant, cherryCupcake, matcha, strawberrySmoothie, shawarma,
    paprikaChips, pinkLemonade, cookies, orangeJuice, bologneseSpaghetti, sushi,
    pastaInTomatoSauce, riceWithMeat, icedCoffeeMoca, grilledSteakAndPotatoes,
    saladBowlVegetable, salmon, riceWithChicken, classicBurger,
    friedChickenWithFrenchFries, randonDrinks, friedChicken
  ];

  allItems.forEach(el => {
    if (!el) return;
    el.classList.remove("show", "hide");
    if (drinks.includes(el)) el.classList.add("show");
    else el.classList.add("hide");
  });
});
// ...existing code...

food.addEventListener("click",function(e) {
  // List of drink element variables
  e.preventDefault();
  const drinks = [
    matcha, strawberrySmoothie, pinkLemonade, orangeJuice, icedCoffeeMoca, randonDrinks, lemonada
  ];

  const allItems = [
    fruitBowl, hotdog, pepperoniPizza, lemonada, sandwich, potatoFries, grilledChicken,
    doubleBeefBurger, croissant, cherryCupcake, matcha, strawberrySmoothie, shawarma,
    paprikaChips, pinkLemonade, cookies, orangeJuice, bologneseSpaghetti, sushi,
    pastaInTomatoSauce, riceWithMeat, icedCoffeeMoca, grilledSteakAndPotatoes,
    saladBowlVegetable, salmon, riceWithChicken, classicBurger,
    friedChickenWithFrenchFries, randonDrinks, friedChicken
  ];

 allItems.forEach(el => {
    if (!el) return;
    el.classList.remove("show", "hide");
    if (!drinks.includes(el)) el.classList.add("show");
    else el.classList.add("hide");
  });
});
const welcomeText = "Welcome to your products page! Here you can explore a variety of products like fresh fruits, hotdogs, pizzas, drinks, sandwiches, and more. Each item shows its price and options to add to cart or add to favorites. To filter items, click the Filter button. To navigate between pages, press the S key and say the page name. To repeat this message, press the A key. To start shopping, just say 'add'.";

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

      if (spokenTextS === "home") {
        window.location.href = "HomePage.html";
      } else if (spokenTextS === "favorites") {
        window.location.href = "MyFavorites.html";
      } else if (spokenTextS === "profile") {
        window.location.href = "MyProfile.html";
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

  localStorage.clear();
  window.location.href = "login.html";
};
function addToList(button) {
    const parentDiv = button.closest('.product-item');
    if(parentDiv) {
        const parentId = parentDiv.id;
        alert("The product ID add to Cart: " + parentId);
        console.log(parentId);
    }
}
function addToFavorites(button) {
    const parentDiv = button.closest('.product-item');
    if(parentDiv) {
        const parentId = parentDiv.id;
        alert("The product ID add to Favorites: " + parentId);
        console.log(parentId);
    }
}