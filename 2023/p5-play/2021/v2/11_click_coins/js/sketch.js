
const DIR = "./assets/";

let ssDoku, anDoku;
let ssKino, anKino;

let coins;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
	ssKino = loadSpriteSheet(DIR + "s_kino_x5.png", 60, 60, 5);
	anKino = loadAnimation(ssKino);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(16);
	background(33);

	coins = new Group();

	// Sprites
	for(let i=0; i<1; i++){
		let x = random(width);
		let y = random(height);
		createCoin(x, y, 1.0);
	}
}

function createCoin(x, y, scale){
	let coin = createSprite(x, y);
	coin.addAnimation("dance", anDoku);
	coin.setCollider("circle", -2, 2, 30);
	coin.setSpeed(2, random(360));
	coin.scale = scale;
	coin.debug = true;
	coin.onMouseReleased = (e)=>{
		if(e.scale < 0.2) return;
		e.scale *= 0.9;
		createCoin(e.position.x, e.position.y, e.scale*0.9);
	}
	coins.add(coin);
}

function draw(){
	background(33);
	drawSprites();

	// Bounce
	for(let i=allSprites.length-1; 0<i; i--){
		for(let j=0; j<i; j++){
			allSprites[i].bounce(allSprites[j]);
		}
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