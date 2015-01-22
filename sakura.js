var Sakura = function(canvas, txt) {
	this.canvas = canvas;
  this.txt = txt;
	this.ctx = canvas.getContext('2d');
  this.trunk = new Branch('trunk', 0);
  this.anim = true;
  this.onFrame = this.onFrame.bind(this);
  this.onFrame();
};

Sakura.prototype.onFrame = function() {
  if (this.anim) {
    window.requestAnimationFrame(this.onFrame);
  }
  this.tick();
  this.txt.textContent = this.trunk.toString();
  this.paint();
};

Sakura.prototype.tick = function() {
  this.trunk.tick();
};

Sakura.prototype.paint = function() {
  
};

var Branch = function(id, depth) {
  this.id = id;
  this.depth = depth;
  this.length = 0.1;
  this.thickness = 0.1;
  this.children = [];
  this.angle = Math.random() * 180.0 - 90.0;
};

Branch.prototype.tick = function() {
  this.thickness += Math.random();
  this.length += Math.random();
  if (Math.random() < 0.01 && this.children.length < 2) {
    this.branch();
  }
  var i = this.children.length;
  while(--i >= 0) {
    this.children[i].tick();
  }
};

Branch.prototype.branch = function() {
  var child = new Branch(this.id + '/' + this.children.length, this.depth + 1);
  this.children.push(child);
  return child;
};

Branch.prototype.toString = function() {
  var indent = new Array(this.depth + 1).join('  ');
  var self = [indent, this.id,
    'length:', this.length,
    'thickness:', this.thickness,
    'angle:', this.angle].join(' ');
  var kids = this.children.map(function(b) { return b.toString(); });
  return [self].concat(kids).join('\n');
};