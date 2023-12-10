
let iKaiji, iZawa;

function preload(){
	iKaiji = loadImage("./assets/i_kaiji.png");
	iZawa = loadImage("./assets/i_zawa.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	noSmooth();

	let kaiji = createSprite(width/2, height/2);
	kaiji.addImage(iKaiji);
	kaiji.scale = 6;
}

function draw() {
	background(33);
	drawSprites();
}

function mousePressed(){
	
	let x = random(width);
	let y = random(height);
	let zawa = createSprite(x, y);
	zawa.addImage(iZawa);
	zawa.setSpeed(1, 180);
	zawa.scale = random(2, 4);
	zawa.life  = floor(random(5, 10));
}