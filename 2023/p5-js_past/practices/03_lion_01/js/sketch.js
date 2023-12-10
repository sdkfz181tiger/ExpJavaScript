
const DIR = "./assets/";

let imgBody, imgHair, imgHead;
let body, head;

function preload(){
	imgBody = loadImage(DIR + "i_lion_body.png");
	imgHead = loadImage(DIR + "i_lion_head.png");
}

function setup(){
	createCanvas(320, 320);
	frameRate(8);
	angleMode(DEGREES);
	noSmooth();
	background(33);
	// Lion
	body = createSprite(width/2, height/2);
	body.addImage(imgBody);
	body.scale = 3;

	head = createSprite(width/2, height/2);
	head.addImage(imgHead);
	head.scale = 3;
}

function draw(){
	background(30, 150, 150);
	
	body.display();
	drawHair(width/2, height/2-10);
	head.display();
}

function drawHair(cX, cY){

	noFill();
	strokeWeight(5);
	for(let i=0; i<12; i++){
		let r = random(256);
		let g = random(256);
		let b = random(256);
		stroke(r, g, b);
		let diameter = i * 10;
		circle(cX, cY, diameter);
	}
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