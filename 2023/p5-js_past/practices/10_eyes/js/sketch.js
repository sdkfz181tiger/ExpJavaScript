
const DIR = "./assets/";

let img;
let cat;

function preload(){
	img = loadImage(DIR + "i_cat.png");
}

function setup(){
	createCanvas(320, 320);
	frameRate(32);
	//angleMode(DEGREES);
	noSmooth();
	background(33);
	// Cat
	cat = createSprite(width/2, height/2);
	cat.addImage(img);
	cat.scale = 6;
}

function draw(){
	background(255, 255, 100);

	drawEye(width/2-32, height/2+5);
	drawEye(width/2+32, height/2+5);
	drawSprites();
}

function drawEye(cX, cY){
	const r = 10;
	const dX = mouseX - cX;
	const dY = mouseY - cY;
	const rad = atan2(dY, dX);
	let x = cX + r * cos(rad);
	let y = cY + r * sin(rad);

	fill(0);
	circle(x, y, 22);
}