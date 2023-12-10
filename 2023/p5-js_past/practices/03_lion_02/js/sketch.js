
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

	const radius = 65;
	const offset = 20;

	for(let i=0; i<360/offset; i++){
		const deg = i * offset;
		const r = (i%2==0)?radius*0.95:radius;
		const x1 = cX + r * cos(deg);
		const y1 = cY + r * sin(deg);
		const x2 = cX + r * cos(deg+offset);
		const y2 = cY + r * sin(deg+offset);
		fill(random(255), 80, 100);
		noStroke();
		triangle(cX, cY, x1, y1, x2, y2);
	}
}