var Sakura = function(canvas) {
  this.trunk = new Branch(0,0,20, this);
  this.tick = this.tick.bind(this);
}

Sakura.prototype.tick = function() {
  requestAnimationFrame(this.tick);
  this.trunk.tick();
  var branches = this.children;
  for ( branch in branches) {
    branch.tick();
  }
 }
 Sakura.prototype.toString = function() {

 }
var Branch = function(length, thickness, angle, tree) {
  this.tree = tree
  this.length = length;
  this.thickness= thickness;
  this.angle = angle;
  this.children= [];
}
Branch.prototype.tick = function() {
  if (Math.random() <= 0.005) {
    var branch = new Branch();
    this.children.push(branch);
  }
  this.length += Math.random();
  this.thickness += Math.random()/10.0;
  console.log(this.children.length, this.tree, this.thickness);
}
Branch.prototype.tick = function() {

}
var sakura = new Sakura(document.getElementById("sakura"));
sakura.tick();

