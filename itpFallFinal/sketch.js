

var video;
var img;
var leaf;
var num;
var snum;
var indexfingerPos, indexfingerX, indexfingerY, indexfingerZ;
var lastindexfingerX, lastindexfingerY, lastindexfingerZ;
var leftpalmPos, leftpalmPosX, leftpalmPosY, lastleftpalmPosX, lastleftpalmPosY;
var colZ;
var strokeR=false;
var strokeY=false;
var strokeB=false;
var handType;
var mapCX,mapCY ;
var grab;
var palmMapX, palmMapY;
var serial; 
var sensorValue = 0;
var sensorOldValue = 0;
var buttonState = 1;
var toggleState = false;
var toggleState2 = false;
var stampState = false;
var stampState2 = false;
var laststampState = false;
var resetState= false;

var lefthander=false;
var righthander=false;

var graphics;




function setup(){

	//tip postion
	pixelDensity(1);
	graphics=createGraphics(innerWidth,innerHeight);
	graphics.background(0);


	//stamp image
	img = loadImage('star.png');
	leaf = loadImage('leaf.png');


	//greenscreen
	var canvas = createCanvas(innerWidth, innerHeight);
	canvas.position(0,0);
    canvas.style("z-index", -1);
	
	//seriously
	canvas.id('p5canvas');
	
  	video = createCapture(VIDEO);
  	video.size(2000,800);
    video.id('p5video');
   	video.hide();
    
    var seriously = new Seriously();

    var src = seriously.source('#p5video');
    var target = seriously.target('#scanvas');
    var chroma =seriously.effect('chroma');
    
    chroma.source= src;
    target.source= chroma;
    var r = 103/255;
    var g = 195/255;
    var b = 171/255;
    
    chroma.screen = [r,g,b,1];
    
    seriously.go();
    clear();


    //leap motion
	if(indexfingerPos == undefined){
		console.log('Are you sure the leap motion is connected?');
	}
	serial = new p5.SerialPort('127.0.0.1');  
    serial.on('data', serialEvent);
	// serial.list();                         
	serial.open("/dev/cu.usbmodem1411");
    
}


function draw(){

	//draw sparkle
	// if(grab > 0.7){
	// 	sparkle();
	// }else{
	// 	stop();
	// }
	
	if(toggleState2==false){
	righthand();
	tipcircle();
	
	} else if(toggleState2==true){
	lefthand();
	tipcircle();

	
	}
	
	

	if (sensorValue != sensorOldValue){
		if(sensorValue > 100){
			background(0);
		} else {
			background(0,0);
		}
	}


}

function tipcircle(){

	image(graphics,0,0);
	
	noStroke();
	ellipseMode(CENTER);
	if(indexfingerZ > 110) {
		fill(100,150);
	} else {

		fill(255,0,0,150);
	}
	ellipse(mapCX,mapCY,20,20);
}



function righthand(){


		if(handType == "right" && handType != "left"){
		  	
			brush(buttonState);
		
			stamp(snum);
					
		}

		if (handType== "left" && handType != "right" ){
			erase();
		}

	}
	


function lefthand(){


		if(handType === "left" && handType != "right"){
		   
			brush(buttonState);

			stamp(snum);
		
		} 

		else if(handType== "right" && handType != "left" ){
			erase();
		}

		

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

			
			graphics.stroke(0);
			graphics.strokeWeight(100);

			graphics.line(mapEraseCX,mapEraseCY,mapEraseLX,mapEraseLY);
	}
}


function sparkle(){
	
	var leftpalmPosX = leftpalmPos[0];
		 	
	var leftpalmPosY = leftpalmPos[1];

 	var palmMapX = map(leftpalmPosX, -220, 345, 0, width);
	var palmMapY = map(leftpalmPosY, 0, 600, height, 0);

	graphics.fill(random(200,255),random(170,200),random(100,150),random(150,250));
	graphics.noStroke();
	graphics.ellipse(random(palmMapX-300,palmMapX+300), random(palmMapY-300,palmMapY+300), random(0,10));
	graphics.fill(random(200,255),random(100,140),random(100,200),random(150,250));
	graphics.rect(random(palmMapX-310,palmMapX+300), random(palmMapY-300,palmMapY+300), random(0,10), random(0,10));

}	
function stamp(snum){

	if ( stampState==true && snum === 1 )
	{

		if(indexfingerZ <-50){
			graphics.image(img, mapCX, mapCY);
			stampState=false;
		}

	}else if ( stampState2==true &&snum === 2 )
	{
		if(indexfingerZ <-50){
			graphics.image(leaf, mapCX, mapCY);
			stampState2=false;
		}

	}
		// }else if(num === 2){


		// 	noFill();
		// 	strokeght(2);
				 	
		// 	if(indexfingerZ>95){
		// 		stroke(255,0);
					
		// 	}else{
		// 		stroke(random(40,150),random(40,100),random(50,200));
		// 	}
			
		// 	rect(mapCX,mapCY,mapCZ,mapCZ);


}

function brush(num){
	
	if(indexfingerPos != undefined){

		indexfingerX = indexfingerPos[0];
	 	indexfingerY = indexfingerPos[1];
	 	indexfingerZ = indexfingerPos[2];
	 	// console.log(indexfingerZ);

	 	mapCX = map(indexfingerX, -220, 345, 0, width);
		mapCY = map(indexfingerY, 0, 500, height, 0);
		var mapCZ = map(indexfingerZ, -250, 200, -130, 150);
	 	

	 	var mapLX = map(lastindexfingerX, -220, 345, 0, width);
		var mapLY = map(lastindexfingerY, 0, 500, height, 0);
		var mapLZ = map(lastindexfingerZ, -250, 200, -130, 150);

		var strokeSize = map(indexfingerZ , -250, 140, 60, 7);

		lastindexfingerX = indexfingerX;
	 	lastindexfingerY = indexfingerY;
	 	lastindexfingerZ = indexfingerZ;
	

		// image(img,mapCX,mapCY);
		// stroke(255);
		// strokeWeight(strokeSize);
		// line(mapCX,mapCY,mapLX,mapLY)



	// if(indexfingerZ>110){
	// 	stroke(255,0,0);
		
	// }
	// console.log(indexfingerZ);

//draw line
	
		
		if ( num === 1 ){
			graphics.noStroke();
			 	
			if(indexfingerZ>110){
				graphics.fill(255,0);
				
			}else{
				graphics.fill(random(100,250),random(120,240),random(150,250));
			}
			
			graphics.ellipse(mapCX,mapCY,mapCZ,mapCZ);

		}else if(num === 2){


			graphics.noFill();
			graphics.strokeWeight(2);
				 	
			if(indexfingerZ>110){
				graphics.stroke(255,0);
					
			}else{

				graphics.stroke(random(40,150),random(40,100),random(50,200));
			}
			
			graphics.rect(mapCX,mapCY,mapCZ,mapCZ);


		}else if(num === 3){

			
			if(indexfingerZ>110){
				graphics.stroke(255,0);
				
			}else {
				graphics.stroke(200,0,200);
			}
			
			graphics.strokeWeight(strokeSize);
			
			graphics.line(mapCX,mapCY,mapLX,mapLY);
		} else if (num === 4){
			graphics.stroke(255,0);
		}
	}
	
}






function serialEvent() {


  	
 	var inString = serial.readLine();


 	// console.log(inString);

	if (inString.length > 0) {
		// inString = inString.trim();

		//print(inString);


		//hand mode toggle

		if (inString=="hand toggle on")
		{

			toggleState2 = false;


		}

		if (inString=="hand toggle off")
		{

			toggleState2 = true;

		}

		


		if (toggleState2==false)
		{
		
			righthander=true;

		
		} 

		if (toggleState2==true)
		{	
				
		
		
			lefthander=true;
			
		}





		if (inString == "mode toggle on")
		{

			toggleState = true;
		}

	    if (inString == "mode toggle off")
	    {

	    	toggleState = false;
	    }

	    if (inString == "s1")
	    {

			stampState = true;
		}


		if (inString == "s2")
		{

			stampState2 = true;
		}

//stamp
		if (toggleState == true && stampState == true)
			
		{	
			// console.log("STAMP");

			snum = 1;

		} else if (toggleState == true && stampState2 == true) {	
				
				
				snum=2;

		}


//brush
		if (toggleState == false && inString == "a") {
				print("a!");
				buttonState = 1;

			} else if (toggleState == false && inString == "b") {
				print("b!");
				buttonState = 2;

			} else if (toggleState == false && inString == "c") {
				print("c!");
				buttonState = 3;
			} else {
				buttonState = 4;
			}
		



		if (inString =="ON"){

			graphics.background(0);
		
		}

		if(resetState){
			graphics.background(255,255,0);
			resetState=false;
			buttonState=1;
			image(graphics,0,0);

		}

		console.log(inString);

	// Serial.write('x');
	}
}

//Analyses the leap motion and stores values in a variable
Leap.loop(function(frame) {

	frame.hands.forEach(function(hands, index, fingers) {
    
 		indexfingerPos = fingers[0].indexFinger.tipPosition;
 		leftpalmPos= frame.hands[0].palmPosition;
		
		handType=frame.hands[0].type;

		console.log(handType);

		// pinch = hand.pinchStrength.toPrecision(2);
		
		//grab
		grab = frame.hands[0].grabStrength;
		
		});

  
  	});