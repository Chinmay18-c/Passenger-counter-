// DOM Elements
const saveEl = document.getElementById("save-el");
const countEl = document.getElementById("count-el");
const warningEl = document.getElementById("warning-el");

// Constants
const MAX_COUNT = 1000;
const STORAGE_KEY = "passengerCounterData";

// State
let count = 0;
let entries = [];

// Initialize from localStorage
function initializeFromStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const data = JSON.parse(savedData);
        count = data.count || 0;
        entries = data.entries || [];
        updateDisplay();
    }
}

// Update display
function updateDisplay() {
    countEl.textContent = count;
    warningEl.textContent = count >= MAX_COUNT ? "Maximum count reached!" : "";
    
    if (entries.length === 0) {
        saveEl.textContent = "No entries yet";
    } else {
        saveEl.textContent = entries.map(entry => 
            `${entry.count} (${entry.timestamp})`
        ).join(" | ");
    }
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        count,
        entries
    }));
}

// Increment counter
function increment() {
    if (count < MAX_COUNT) {
        count++;
        updateDisplay();
    }
}

// Save current count
function save() {
    if (count > 0) {
        const timestamp = new Date().toLocaleTimeString();
        entries.push({ count, timestamp });
        count = 0;
        updateDisplay();
        saveToStorage();
    }
}

// Reset everything
function reset() {
    if (confirm("Are you sure you want to reset everything?")) {
        count = 0;
        entries = [];
        updateDisplay();
        saveToStorage();
    }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    switch(e.key.toLowerCase()) {
        case "i":
            increment();
            break;
        case "s":
            save();
            break;
        case "r":
            reset();
            break;
    }
});

// Initialize the app
initializeFromStorage();

