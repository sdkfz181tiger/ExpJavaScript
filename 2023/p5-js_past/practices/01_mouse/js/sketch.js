
const DIR = "./assets/";

let img;
let frog;

function preload(){
	img = loadImage(DIR + "i_frog.png");
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(32);
	background(33);
	// Frog
	frog = createSprite(width/2, height/2);
	frog.addImage(img);
	frog.scale = 3;
}

function draw(){
	background(33);

	fill(64, 128, 256);
	rect(0, mouseY, width, height);

	frog.position.x = mouseX;
	frog.position.y = mouseY;

	drawSprites();
}