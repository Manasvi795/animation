let canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = " #111827";

const heart = new Image();
heart.src = "assets/ui/heart.png";

const apple = new Image();
apple.src = "assets/fruits/Apple.png";

let lives = 3;

// let fruitX = 300;
// let fruitY = canvas.height - 10;
// let fruitSpeedX = 2;
// let fruitSpeedY = -12;

let gravity = 0.15;
let fruit = {
  x: Math.random() * (canvas.width - 10),
  y: canvas.height - 10,
  speedX: (Math.random() - 0.5) * 6,
  speedY: -12,
  image: apple,
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
    fruit.speedY = -12;
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
