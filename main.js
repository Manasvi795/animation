let canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = " #111827";

const heart = new Image();
heart.src = "assets/ui/heart.png";

let lives = 3;

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

function getRandomFruit() {
  let ranIdx = Math.floor(Math.random() * loadFruits.length);
  return loadFruits[ranIdx];
}
// let fruitX = 300;
// let fruitY = canvas.height - 10;
// let fruitSpeedX = 2;
// let fruitSpeedY = -12;

let gravity = 0.25;
let fruit = {
  x: Math.random() * (canvas.width - 10),
  y: canvas.height - 10,
  speedX: (Math.random() - 0.5) * 8,
  speedY: -15,
  image: getRandomFruit(),
};

function drawLives() {
  for (let i = 0; i < lives; i++) {
    c.drawImage(heart, 30 + i * 45, 40, 50, 50);
  }
}

function drawFruits() {
  c.drawImage(fruit.image, fruit.x, fruit.y, 80, 80);
}

function updateFruit() {
  fruit.x += fruit.speedX;
  fruit.y += fruit.speedY;
  fruit.speedY += gravity;
  if (fruit.y > canvas.height) {
    fruit.x = Math.random() * (canvas.width - 10);
    fruit.y = canvas.height - 10;
    fruit.speedY = -15;
    fruit.image = getRandomFruit();
  }
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  updateFruit();
  drawLives();
  drawFruits();
  requestAnimationFrame(animate);
}

animate();
