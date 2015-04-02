var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
