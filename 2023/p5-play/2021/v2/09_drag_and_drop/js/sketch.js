
const DIR = "./assets/";

let iRei;
let target = null;

function preload(){
	iRei = loadImage(DIR + "c_rei.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	background(33);

	let reimu = createSprite(width/2, height/2);
	reimu.addImage(iRei);
	reimu.scale = 4;
	reimu.debug = true;

	reimu.onMousePressed = (e)=>{
		target = e;
	}

	reimu.onMouseReleased = (e)=>{
		target = null;
	}
}

function draw(){
	background(33);

	if(target != null){
		target.position.x = mouseX;
		target.position.y = mouseY;
	}

	drawSprites();
}