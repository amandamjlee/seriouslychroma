
var video;


function setup() {
  background(200);
  var canvas = createCanvas(500,500);
  // canvas.position(0,0);

 

  
  canvas.id('p5canvas');

	video = createCapture(VIDEO);
	video.size(500,500);
  video.id('p5video');
  
  var seriously = new Seriously();
  

  var src = seriously.source('#p5video');
  var target = seriously.target('#scanvas');
  
  var chroma =seriously.effect('chroma');
  
  chroma.source= src;
  target.source= chroma;
  var r = 30/255;
  var g = 160/255;
  var b = 84/225;
  
  chroma.screen = [r,g,b,1];
  
  
  seriously.go();
    clear();



}

function draw() {
  noStroke();
  fill(255,0,0);
  ellipse(mouseX,mouseY, 20,20);

}