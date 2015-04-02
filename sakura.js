var canvas = document.getElementById('my-canvas');

var ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
ctx.fillStyle = "rgb(255,0,0)";

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 100);
ctx.lineTo(100, 200);
ctx.closePath();
ctx.strokeStyle = "rgb(0,255,0)";
ctx.fill();

function Sakura(message){
  this.message = message;
  this.tick = this.tick.bind(this);
  var trunk = Branch(message);
}

Sakura.prototype.tick = function(){

}

function Branch(length, thickness, angle){
  this.length = length
  this.thickness = thickness;
  this.angle = angle;
  this.children = Branch();

}
