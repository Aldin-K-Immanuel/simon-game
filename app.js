// Variables to hold the game and user sequences
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

const btns = ["green", "red", "yellow", "blue"];
const levelTitle = document.getElementById("level-title");
const highScoreDisplay = document.getElementById("high-score");
const allBtns = document.querySelectorAll(".btn");

let highScore = 0;

// Start the game on keypress
document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    nextLevel();
  }
});

// Flash animation on button
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

// Generate next level sequence and show it
function nextLevel() {
  userSeq = [];
  level++;
  levelTitle.textContent = `Level ${level}`;

  // Add random new color to sequence
  const randomColor = btns[Math.floor(Math.random() * btns.length)];
  gameSeq.push(randomColor);

  // Show sequence to user, one color at a time
  gameSeq.forEach((color, index) => {
    setTimeout(() => {
      const btn = document.querySelector(`.${color}`);
      btnFlash(btn);
      // Optionally play sound here
    }, index * 700);
  });
}

// Check user input against game sequence
function checkUserInput(index) {
  if (userSeq[index] !== gameSeq[index]) {
    gameOver();
    return;
  }

  // If user completed current sequence correctly
  if (userSeq.length === gameSeq.length) {
    // Update high score
    if (level > highScore) {
      highScore = level;
      highScoreDisplay.textContent = highScore;
    }
    setTimeout(nextLevel, 1000);
  }
}

// Handle button clicks by user
function btnPress() {
  if (!started) return;

  const clickedColor = this.classList[1]; //this refers to the button that was clicked.
  // this.classList[1] assumes the button has two classes (e.g., "btn green") so classList=["btn","green"], and the second one is the color. 
  
  // OR simply use the id to determine the button : const clickedColor = this.id;

  userSeq.push(clickedColor);
  btnFlash(this);

  checkUserInput(userSeq.length - 1);
}

// Add event listeners to buttons
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

// Game over logic
function gameOver() {
  levelTitle.textContent = "Game Over! Press any key to restart.";
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  // Optionally add a sound or screen flash here
}
