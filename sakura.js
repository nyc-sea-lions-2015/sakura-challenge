var Sakura = function(canvas, txt) {
	this.canvas = canvas;
  this.txt = txt;
	this.ctx = canvas.getContext('2d');
  this.trunk = new Branch('trunk', 1, this);
  this.trunk.angle = 0;
  this.trunk.branch();
  this.trunk.branch();
  this.anim = true;
  this.onFrame = this.onFrame.bind(this);
  this.onFrame();
  this.onClick = this.onClick.bind(this);
  canvas.addEventListener('click', this.onClick);
};

Sakura.prototype.onClick = function() {
  this.anim = !this.anim;
  this.onFrame();
};

Sakura.prototype.onFrame = function() {
  if (this.anim) {
    window.requestAnimationFrame(this.onFrame);
  }
  this.tick();
  //this.txt.textContent = this.trunk.toString();
  this.paint();
};

Sakura.prototype.tick = function() {
  this.trunk.tick();
};

Sakura.prototype.paint = function() {
  var width = this.canvas.clientWidth;
  var height = this.canvas.clientHeight;
  if (this.width != width || this.height != height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }
  this.light = [width / 2, 0];
  this.ctx.clearRect(0, 0, width, height);

  var turtle = new Turtle();
  turtle.pos = [width / 2, height];
  this.trunk.paint(this.ctx, turtle);
};

var Branch = function(id, depth, tree) {
  this.id = id;
  this.depth = depth;
  this.length = 0.1;
  this.thickness = 0.1;
  this.children = [];
  this.tree = tree;
  if (depth % 2 == 1) {
    this.angle = Math.random() * 30.0 - 15.0;
  } else {
    this.angle = (Math.random() * 180.0 - 90.0) / Math.sqrt(depth);
  }
  this.sway = (Math.random() - 0.5) * 0.1;
};

Branch.prototype.tick = function() {
  this.thickness += (0.03 / (this.depth * this.depth)) * Math.random();
  this.length += 0.2 * Math.random();
  if (this.depth < 6) {
    if (Math.random() < 0.01 && this.children.length < 1) {
      this.branch();
    }
    if (Math.random() < 0.01 && this.children.length < 4) {
      this.branch();
    }
  }
  var i = this.children.length;
  while(--i >= 0) {
    this.children[i].tick();
  }
};

Branch.prototype.branch = function() {
  var child = new Branch(this.id + '/' + this.children.length, this.depth + 1, this.tree);
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

Branch.prototype.paint = function(ctx, turtle) {
  //this.angle += (Math.random() - 0.5) / Math.sqrt(this.thickness);

  ctx.strokeStyle = 'rgba(255, 0, 255, 0.4)';
  ctx.lineWidth = this.thickness;
  ctx.lineJoin = 'round';
  var start = turtle.pos;
  turtle.turn(this.angle);
  turtle.fwd(this.length);  
  var end = turtle.pos;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  this.angle += this.sway;
  if (Math.random() < 0.01) {
    this.sway = (Math.random() - 0.5) * (1.0 / this.thickness);
  }

  /*if (end.angle(this.tree.light)
    this.angle += Math.random() - 0.5;
  }*/



 // ctx.lineWidth = this.thickness;

  var i = this.children.length;
  while(--i >= 0) {
    this.children[i].paint(ctx, turtle.spawn());
  }
};