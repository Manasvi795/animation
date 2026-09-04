let canvas = document.getElementById("canvas");

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

var c = canvas.getContext("2d");
// c.fillRect(x,y,width,height);
c.fillRect(100, 100, 100, 100);
c.fillRect(100, 0, 100, 100);
c.fillRect(100, 200, 100, 100);
c.fillRect(200, 100, 100, 100);
c.fillRect(0, 100, 100, 100);
