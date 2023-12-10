
const DIR = "./assets/";

let ssRed, anRed;
let ssGreen, anGreen;
let ssBlue, anBlue;
let animations = [];

let ninjas;

function preload(){
	ssRed = loadSpriteSheet(DIR + "s_red.png", 16, 16, 5);
	anRed = loadAnimation(ssRed);
	ssGreen = loadSpriteSheet(DIR + "s_green.png", 16, 16, 5);
	anGreen = loadAnimation(ssGreen);
	ssBlue = loadSpriteSheet(DIR + "s_blue.png", 16, 16, 5);
	anBlue = loadAnimation(ssBlue);
	animations = [anRed, anGreen, anBlue];
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(16);
	background(33);

	ninjas = new Group();

	// Sprites
	for(let i=0; i<10; i++){
		let x = random(width);
		let y = random(height);
		createNinja(x, y, 3.0);
	}
}

function createNinja(x, y, scale){
	let animation = random(animations);
	let ninja = createSprite(x, y);
	ninja.addAnimation("dance", animation);
	ninja.setCollider("circle", -2, 2, 8);
	ninja.setSpeed(2, random(360));
	ninja.scale = scale;
	//ninja.debug = true;
	ninja.onMouseReleased = (e)=>{
		e.remove();
	}
	ninjas.add(ninja);
}

function draw(){
	background(33);
	drawSprites();

	// Depth
	if(frameCount%4 == 0){
		for(let sprite of allSprites) sprite.depth = sprite.position.y;
	}

	// AllSprites
	for(let sprite of allSprites){
		if(sprite.position.x < 0){
			sprite.position.x = width;
		}
		if(width < sprite.position.x){
			sprite.position.x = 0;
		}
		if(sprite.position.y < 0){
			sprite.position.y = height;
		}
		if(height < sprite.position.y){
			sprite.position.y = 0;
		}
	}
}