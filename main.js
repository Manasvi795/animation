let canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "url('assets/ui/bg.png')";
canvas.style.backgroundSize = "cover";
canvas.style.backgroundPosition = "center";

let gameScreen = document.getElementById("gameScreen");
let cardTitle = document.getElementById("cardTitle");
let cardMessage = document.getElementById("cardMessage");
let cardButton = document.getElementById("cardButton");
let finalScore = document.getElementById("finalScore");

const heart = new Image();
heart.src = "assets/ui/heart.png";

let lives = 3;
let gameOver = false;
let score = 0;
let scoreEl = document.getElementById("score");

function drawLives() {
  for (let i = 0; i < lives; i++) {
    c.drawImage(heart, canvas.width / 2 - 30 + i * 50, 50, 40, 50);
  }
}

const fruitImages = [
  "assets/fruits/Apple.png",
  "assets/fruits/Banana.png",
  "assets/fruits/Coconut.png",
  "assets/fruits/Mango.png",
  "assets/fruits/Orange.png",
  "assets/fruits/Strawberry.png",
];

const loadFruits = fruitImages.map((src) => {
  const fruit = new Image();
  fruit.src = src;
  return fruit;
});

function drawFruits() {
  for (let i = fruits.length - 1; i >= 0; i--) {
    let fruit = fruits[i];
    c.drawImage(fruit.image, fruit.x, fruit.y, 80, 80);
  }
}

function getRandomFruit() {
  let ranIdx = Math.floor(Math.random() * loadFruits.length);
  return loadFruits[ranIdx];
}

let gravity = 0.25;
let fruits = [];
function createFruit() {
  if (fruits.length >= 3) {
    return;
  }
  fruits.push({
    x: Math.random() * (canvas.width - 10),
    y: canvas.height - 10,
    speedX: (Math.random() - 0.5) * 8,
    speedY: -15,
    image: getRandomFruit(),
  });
}

function updateFruit() {
  for (let i = fruits.length - 1; i >= 0; i--) {
    let fruit = fruits[i];
    fruit.x += fruit.speedX;
    fruit.y += fruit.speedY;
    fruit.speedY += gravity;
    if (fruit.y > canvas.height) {
      fruit.x = Math.random() * (canvas.width - 10);
      fruit.y = canvas.height - 10;
      fruit.speedY = -15;
      fruit.image = getRandomFruit();
      fruits.splice(i, 1);
      lives--;
      if (lives <= 0) {
        gameOver = true;
        showGameCard("GAME OVER", "PLAY AGAIN", "SCORE: " + score);
      }
    }
  }
}
createFruit();
setInterval(() => {
  createFruit();
}, 1000);

function showGameCard(title, message, buttonText, score = "") {
  cardTitle.textContent = title;
  cardMessage.textContent = message;
  cardButton.textContent = buttonText;
  finalScore.textContent = score;

  gameScreen.style.display = "flex";
}

let mousex = 0;
let mousey = 0;
let lstMousex = 0;
let lstMousey = 0;
let isMov = false;
canvas.addEventListener("pointermove", (e) => {
  const rect = canvas.getBoundingClientRect();
  lstMousex = mousex;
  lstMousey = mousey;
  mousex = e.clientX - rect.left;
  mousey = e.clientY - rect.top;
  isMov = true;
});
function drawPointer() {
  c.beginPath();
  c.arc(mousex, mousey, 10, 0, Math.PI * 2);
  c.strokeStyle = "white";
  c.lineWidth = 2;
  c.stroke();
}
function drawTrail() {
  if (!isMov) {
    return;
  }
  c.beginPath();
  c.moveTo(lstMousex, lstMousey);
  c.lineTo(mousex, mousey);
  c.strokeStyle = "white";
  c.lineWidth = 5;
  c.lineCap = "round";
  c.stroke();
  isMoving = false;
}
function checkFruitCut() {
  for (let i = fruits.length - 1; i >= 0; i--) {
    let fruit = fruits[i];
    if (
      mousex > fruit.x &&
      mousex < fruit.x + 80 &&
      mousey > fruit.y &&
      mousey < fruit.y + 80
    ) {
      fruits.splice(i, 1);
      score += 10;
      scoreEl.textContent = score;
    }
  }
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver) {
    return;
  }
  updateFruit();
  checkFruitCut();
  drawLives();
  drawFruits();
  drawPointer();
  drawTrail();
  requestAnimationFrame(animate);
}

function startGame() {
  gameOver = false;
  lives = 3;
  score = 0;
  fruits = [];
  scoreEl.textContent = score;
  gameScreen.style.display = "none";
  createFruit();
  animate();
}
cardButton.addEventListener("click", () => {
  startGame();
});
showGameCard("FRUIT SLICER", "Pop the fruits", "START GAME");
