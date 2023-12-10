
const DIR = "./assets/";

let anBike;
let bike;

function preload(){
	let ssBike = loadSpriteSheet(DIR + "s_bike.png", 48, 48, 2);
	anBike = loadAnimation(ssBike);
}

function setup(){
	createCanvas(320, 320);
	frameRate(32);
	angleMode(DEGREES);
	noSmooth();
	// Bike
	bike = createSprite(width/2, height/2);
	bike.addAnimation("go", anBike);
	bike.scale = 2;
	bike.debug = true;
}

function draw(){
	background(30, 150, 150);
	drawSprites();

	if(width < bike.position.x){
		bike.position.x = 0;
	}
}

function mousePressed(){
	bike.rotation = -30;
	bike.setSpeed(5, 0);
}

function mouseReleased(){
	bike.rotation = 0;
	bike.setSpeed(0, 0);
}