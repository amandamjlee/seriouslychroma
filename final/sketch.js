
var video;
var img;


var indexfingerPos, indexfingerX, indexfingerY, indexfingerZ, lastindexfingerX, lastindexfingerY,lastindexfingerZ;
var leftpalmPos, leftpalmPosX,leftpalmPosY,lastleftpalmPosX,lastleftpalmPosY;
var colZ;
var strokeR=false;
var strokeY=false;
var strokeB=false;
var handType;
var mapCX,mapCY ;
var grab;
var palmMapX, palmMapY;



function setup(){


	// createCanvas(innerWidth, innerHeight);
	background(0);

	// ellipse(mouseX,mouseY,20,20);

	img= loadImage('circle.png');


	var canvas = createCanvas(innerWidth, innerHeight);
	canvas.position(0,0);
    canvas.style("z-index",-1);
	
	//seriously
	canvas.id('p5canvas');
	// canvas.style('size',)

  	video = createCapture(VIDEO);
  	video.size(2000,1000);
    video.id('p5video');
   	video.hide();
    
    var seriously = new Seriously();
    

    var src = seriously.source('#p5video');
    var target = seriously.target('#scanvas');

    
    var chroma =seriously.effect('chroma');
    
    chroma.source= src;
    target.source= chroma;
    var r = 0/255;
    var g = 255/255;
    var b = 0/255;
    
    chroma.screen = [r,g,b,1];
    
    
    seriously.go();
      clear();


     //leap motion

	if(indexfingerPos == undefined){
		console.log('Are you sure the leap motion is connected?');
	}

    
}

function draw(){
	
  	// fill(255,0,0);
  	// ellipse(mouseX,mouseY, 20,20);
	
	//color boxs

	//draw sparkle

	// if(grab > 0.7){
	// 	sparkle();
	// }else{
	// 	stop();
	// }
	

	//draw brush

	if(handType=="right"&&handType!="left"){
	 
	 brush();	

	}

	//draw erasor

	if(handType=="left"&&handType!="right"){
	 erase();
	 
	}


	tipPos();



	noStroke();
	fill(255,0,0);
	rect(10,10,100,100);
	fill(255,200,0);
	rect(10,150,100,100);
	fill(0,200,255);
	rect(10,290,100,100);

}


function erase(){
	if(leftpalmPos != undefined){

			leftpalmPosX = leftpalmPos[0];
		 	
		 	leftpalmPosY = leftpalmPos[1];

		 	

		 	var mapEraseCX = map(leftpalmPosX, -220, 345, 0, width);
			var mapEraseCY = map(leftpalmPosY, 0, 600, height, 0);

		 	

		 	var mapEraseLX = map(lastleftpalmPosX, -220, 345, 0, width);
			var mapEraseLY = map(lastleftpalmPosY, 0, 600, height, 0);

			lastleftpalmPosX = leftpalmPosX;
		 	lastleftpalmPosY = leftpalmPosY;

			
			stroke(0);
			strokeWeight(80);

			line(mapEraseCX,mapEraseCY,mapEraseLX,mapEraseLY);
			

	}
}



function sparkle(){
	
	var leftpalmPosX = leftpalmPos[0];
		 	
	var leftpalmPosY = leftpalmPos[1];

 	var palmMapX = map(leftpalmPosX, -220, 345, 0, width);
	var palmMapY = map(leftpalmPosY, 0, 600, height, 0);

	fill(random(200,255),random(200,255),random(150,250));
	noStroke();
	ellipse(random(palmMapX-300,palmMapX+300), random(palmMapY-300,palmMapY+300), random(0,10));


}	


function brush(){
	

	if(indexfingerPos != undefined){

	 	indexfingerX = indexfingerPos[0];
	 	indexfingerY = indexfingerPos[1];
	 	indexfingerZ = indexfingerPos[2];
	 	// console.log(indexfingerZ);

	 	mapCX = map(indexfingerX, -220, 345, 0, width);
		mapCY = map(indexfingerY, 0, 600, height, 0);
		var mapCZ = map(indexfingerZ, -250, 200, -130, 150);
	 	

	 	var mapLX = map(lastindexfingerX, -220, 345, 0, width);
		var mapLY = map(lastindexfingerY, 0, 600, height, 0);
		var mapLZ = map(lastindexfingerZ, -250, 200, -130, 150);

		var strokeSize = map(indexfingerZ , -250, 140, 80, 10);

		lastindexfingerX = indexfingerX;
	 	lastindexfingerY = indexfingerY;
	 	lastindexfingerZ = indexfingerZ;

		
	

		
		stroke(255);
		strokeWeight(strokeSize);
		// line(mapCX,mapCY,mapLX,mapLY);
		
	

	console.log(indexfingerZ);

//change color
	

	if(mapCX>10&&mapCX<110&&mapCY>10&&mapCY<110){
		strokeR=true;
		strokeY=false;
		strokeB=false;

	}

	if(strokeR==true){
		stroke(255,0,0);

	}

	if(mapCX>10&&mapCX<110&&mapCY>150&&mapCY<250){
		strokeY=true;
		strokeR=false;
		strokeB=false;
	}

	if(strokeY==true){
		stroke(255,200,0);

	}

	if(mapCX>10&&mapCX<110&&mapCY>290&&mapCY<390){
		strokeB=true;
		strokeR=false;
		strokeY=false;
	}

	if(strokeB==true){
		stroke(0,200,255);

	}

	if(indexfingerZ>95){
		stroke(255,255,255,0);
		
	}
	
//draw line

	line(mapCX,mapCY,mapLX,mapLY);
	
	}
	
}




function tipPos(){
	noStroke();
	fill(100,100,100);
	ellipse(mapCX,mapCY,15,15);


}

//Analyses the leap motion and stores values in a variable
Leap.loop(function(frame) {

	frame.hands.forEach(function(hands, index, fingers) {
    
 		indexfingerPos = fingers[0].indexFinger.tipPosition;
 		leftpalmPos= frame.hands[0].palmPosition;
 		
		
		handType=frame.hands[0].type;

 		// handString = concatData("hand_type",hand.type)


		console.log(handType);
		console.log(frame);

 		// console.log(indexfingerPos);

 		//pinch
		// pinch = hand.pinchStrength.toPrecision(2);
		
		//grab
		grab = frame.hands[0].grabStrength;
		
		});

  
  	});