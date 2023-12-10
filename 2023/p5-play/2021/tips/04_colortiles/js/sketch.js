
let tNum = 1;
let tSize, tCorner;
let colorOK, colorNG;
let colorIndex;

let msg = "Tiles:" + tNum*tNum;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	noSmooth();
	noStroke();

	next();
}

function draw(){
	colorMode(RGB);
	background(33);

	colorMode(HSB);
	let startX = width/2 - tSize*tNum/2;
	let startY = height/2 - tSize*tNum/2;

	for(let r=0; r<tNum; r++){
		for(let c=0; c<tNum; c++){

			let index = tNum * r + c;
			if(index == colorIndex){
				fill(colorOK);
			}else{
				fill(colorNG);
			}

			let x = startX + tSize * c;
			let y = startY + tSize * r;
			square(x, y, tSize*0.9, tCorner);
		}
	}

	colorMode(RGB);
	fill(255);
	textSize(32);
	textAlign(CENTER, CENTER);
	text(msg, width/2, (height/2-tSize*tNum/2)/2);
}

function mousePressed(){

	let rgb = get(mouseX, mouseY);
	//console.log(rgb, colorOK.levels);
	if(rgb[0] == colorOK.levels[0] && 
		rgb[1] == colorOK.levels[1] && 
		rgb[2] == colorOK.levels[2]){
		console.log("Success!!");
		next();// Next
	}else{
		console.log("Failed...");
		msg = "GAME OVER:" + tNum;
	}
}

function next(){
	colorMode(HSB);

	tNum++;
	tSize = (width<height)?width*0.8/tNum:height*0.8/tNum;
	tCorner = tSize * 0.1;

	let h = floor(random(0, 360));
	let s = floor(random(60, 100));
	let b = floor(random(60, 100));
	let r = floor(random(20, 40));
	colorOK = color(h, s, b);
	colorNG = color(h, s-r, b-r);
	colorIndex = floor(random(tNum*tNum));

	msg = "SCORE:" + tNum;
}