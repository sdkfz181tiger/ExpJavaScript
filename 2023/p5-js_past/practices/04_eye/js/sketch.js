
const DIR = "./assets/";

let iCenter, iLeft, iRight, iChuru;
let cat, churu;

function preload(){
	iCenter = loadImage(DIR + "i_center.png");
	iLeft = loadImage(DIR + "i_left.png");
	iRight = loadImage(DIR + "i_right.png");
	iChuru = loadImage(DIR + "i_churu.png");
}

function setup(){
	createCanvas(320, 320);
	frameRate(32);
	angleMode(DEGREES);
	noSmooth();
	// Cat
	cat = createSprite(width/2, height/2);
	cat.addImage("c", iCenter);
	cat.addImage("l", iLeft);
	cat.addImage("r", iRight);
	cat.scale = 3;
	// Churu
	churu = createSprite(width/2, height/2+40);
	churu.addImage(iChuru);
	churu.scale = 2;
	churu.rotation = 45;
}

function draw(){
	background(30, 150, 150);
	drawSprites();

	if(mouseX < width/2){
		cat.changeImage("l");
	}else{
		cat.changeImage("r");
	}

	churu.position.x = mouseX;
}