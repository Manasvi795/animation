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
function drawLives() {
  for (let i = 0; i < 3; i++) {
    if (i < lives) {
      c.drawImage(heart, 30 + i * 45, 30, 40, 40);
    }
  }
}

// c.fillRect(x,y,width,height);
c.fillStyle = "rgba(255,0,0,0.5)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0,0,255,0.5)";
c.fillRect(100, 0, 100, 100);
c.fillRect(100, 200, 100, 100);
c.fillStyle = "rgba(0,255,0,0.5)";
c.fillRect(200, 100, 100, 100);
c.fillRect(0, 100, 100, 100);

c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3";
c.stroke();

// c.arc(x:Int,y:Int,r:Int,startAngle:Float(radians),endAngle:Float(radians),drawClockwise);

// static circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// three circles forming using loop randomly
// for (var i = 0; i < 3; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = `rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256},${Math.random()})`;
//   c.stroke();
// }

window.addEventListener("mousemove", function (event) {});
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = `rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256},${Math.random()})`;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
var circleArray = [];

for (var j = 0; j < 30; j++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;
  var radius = 30;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();

// spiral
var x = Math.random() * window.innerWidth;
var y = Math.random() * window.innerWidth;
var dx = 5;
var dy = 5;
var radius = 30;
function animate1() {
  requestAnimationFrame(animate1);

  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = `rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256},${Math.random()})`;
  c.stroke();
  if (x + radius > innerWidth || x - radius < 0) {
    dx = -dx;
  }
  if (y + radius > innerHeight || y - radius < 0) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}
// animate1();

// animation of 1 circle
var w = Math.random() * window.innerWidth;
function animate2() {
  requestAnimationFrame(animate2);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.beginPath();
  c.arc(w, 200, 30, 0, Math.PI * 2, false);
  c.strokeStyle = `rgba(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256},${Math.random()})`;
  c.stroke();
  w += 1;
}
// animate2();
