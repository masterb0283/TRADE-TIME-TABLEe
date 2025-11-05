// === Basic data ===
const verses = [
  { text: "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, to give you hope and a future.", ref: "Jeremiah 29:11" },
  { text: "The Lord is near to the brokenhearted and saves the crushed in spirit.", ref: "Psalm 34:18" },
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "The joy of the Lord is your strength.", ref: "Nehemiah 8:10" },
  { text: "Come to me, all who are weary, and I will give you rest.", ref: "Matthew 11:28" }
];

const quotes = [
  "Small steps every day move mountains.",
  "You are stronger than you think.",
  "Hope is the quiet courage to keep going.",
  "Let gratitude lead you this week."
];

const foodBenefits = [
  "Oats provide lasting energy and are rich in soluble fiber for heart health.",
  "Fish offers lean protein and omega-3s that support brain and heart health.",
  "Fruits and vegetables supply vitamins that boost immunity and recovery.",
  "Yogurt adds probiotics for gut balance and digestion.",
  "Plantains are a good source of potassium and gentle on digestion.",
  "Legumes like beans offer plant protein and steady energy.",
  "Sweet potatoes are packed with beta-carotene and fiber.",
  "Whole grains such as quinoa keep blood sugar stable and fill you up."
];

const kidneyFriendlyFruits = [
  "Apples – rich in fiber and gentle on kidneys",
  "Blueberries – full of antioxidants, low in potassium",
  "Red grapes – good for heart and kidney health",
  "Pineapple – refreshing and lower in potassium",
  "Cranberries – support urinary tract and kidney health",
  "Watermelon – hydrating and kidney-safe in moderation",
  "Peaches – a soft, low-potassium fruit option"
];

const meals = {
  breakfast: [
    { name: "Oat porridge with fruit" },
    { name: "Scrambled eggs & wholegrain toast" },
    { name: "Smoothie (banana, berries, almond milk)" },
    { name: "Yogurt parfait with honey & oats" },
    { name: "Boiled plantain & avocado" }
  ],
  lunch: [
    { name: "Grilled fish, steamed veg & rice" },
    { name: "Quinoa salad with veggies & chickpeas" },
    { name: "Chicken stew (light) with boiled yam" },
    { name: "Roasted vegetables & couscous" },
    { name: "Beans porridge with plantain" }
  ],
  dinner: [
    { name: "Baked sweet potato & green salad" },
    { name: "Steamed fish with lemon & greens" },
    { name: "Light vegetable soup and bread" },
    { name: "Stir fry tofu with rice" },
    { name: "Grilled chicken & mixed greens" }
  ],
  snack: [
    { name: "Fresh fruit" },
    { name: "Handful of nuts" },
    { name: "Cucumber & carrot sticks" },
    { name: "Low-sugar yogurt" }
  ]
};

// === Helpers ===
const formatDateISO = d => d.toISOString().slice(0, 10);
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];

// === Plan generation ===
function generatePlan(startISO) {
  const plan = [];
  const start = new Date(startISO);
  for (let i = 0; i < 180; i++) {
    const date = addDays(start, i);
    plan.push({
      date: formatDateISO(date),
      verseIndex: i % verses.length,
      quoteIndex: i % quotes.length,
      benefitIndex: i % foodBenefits.length,
      breakfast: randomFrom(meals.breakfast),
      lunch: randomFrom(meals.lunch),
      dinner: randomFrom(meals.dinner),
      snack: randomFrom(meals.snack)
    });
  }
  return plan;
}

// === Local Storage ===
function savePlan(plan) { localStorage.setItem("hope_nourish_plan", JSON.stringify(plan)); }
function loadPlan() {
  try { return JSON.parse(localStorage.getItem("hope_nourish_plan")) || null; }
  catch { return null; }
}
function clearPlan() { localStorage.removeItem("hope_nourish_plan"); }

// === UI ===
const startInput = document.getElementById("startDateInput");
const dayLabel = document.getElementById("dayLabel");
const verseText = document.getElementById("verseText");
const verseRef = document.getElementById("verseRef");
const motivationText = document.getElementById("motivationText");
const benefitText = document.getElementById("benefitText");
const breakfast = document.getElementById("breakfast");
const snack = document.getElementById("snack");
const lunch = document.getElementById("lunch");
const dinner = document.getElementById("dinner");
const fullDate = document.getElementById("fullDate");
const dayNumber = document.getElementById("dayNumber");
const fruitList = document.getElementById("fruitList");

const prevDayBtn = document.getElementById("prevDay");
const nextDayBtn = document.getElementById("nextDay");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const printBtn = document.getElementById("printBtn");

let plan = loadPlan();
let currentIndex = 0;

// === Rendering ===
function renderDay(i) {
  if (!plan || !plan.length) return;
  if (i < 0) i = 0;
  if (i >= plan.length) i = plan.length - 1;
  currentIndex = i;

  const day = plan[i];
  const verse = verses[day.verseIndex];
  const quote = quotes[day.quoteIndex];
  const benefit = foodBenefits[day.benefitIndex];

  fullDate.textContent = day.date;
  dayNumber.textContent = `Day ${i + 1} / 180`;
  dayLabel.textContent = `Day ${i + 1}`;

  verseText.textContent = verse.text;
  verseRef.textContent = verse.ref;
  motivationText.textContent = quote;
  benefitText.textContent = benefit;

  breakfast.textContent = day.breakfast.name;
  snack.textContent = day.snack.name;
  lunch.textContent = day.lunch.name;
  dinner.textContent = day.dinner.name;

  // Fruit suggestions
  fruitList.innerHTML = "";
  const todayFruits = [randomFrom(kidneyFriendlyFruits), randomFrom(kidneyFriendlyFruits)];
  todayFruits.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    fruitList.appendChild(li);
  });
}

// === Events ===
generateBtn.addEventListener("click", () => {
  const start = startInput.value || formatDateISO(new Date());
  plan = generatePlan(start);
  savePlan(plan);
  renderDay(0);
  alert("6-month plan generated and saved locally!");
});

clearBtn.addEventListener("click", () => {
  if (confirm("Clear saved plan?")) {
    clearPlan();
    plan = null;
    location.reload();
  }
});

prevDayBtn.addEventListener("click", () => {
  if (plan) renderDay(currentIndex - 1);
});

nextDayBtn.addEventListener("click", () => {
  if (plan) renderDay(currentIndex + 1);
});

printBtn.addEventListener("click", () => window.print());

// === Init ===
(function init() {
  const today = formatDateISO(new Date());
  if (!startInput.value) startInput.value = today;

  if (plan && plan.length) {
    const idx = plan.findIndex(p => p.date === today);
    currentIndex = idx >= 0 ? idx : 0;
    renderDay(currentIndex);
  }
})();
