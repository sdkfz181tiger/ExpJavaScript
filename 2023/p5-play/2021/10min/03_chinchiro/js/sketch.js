
let iKaiji, iZawa;
let iHancho, anDice
let dices;
let msg = "ゾロ目を出したら君の勝ちだよ...!!";

function preload(){
	iKaiji = loadImage("./assets/i_kaiji.png");
	iZawa = loadImage("./assets/i_zawa.png");
	iHancho = loadImage("./assets/i_hancho.png");
	let ssDice = loadSpriteSheet("./assets/i_dice.png", 12, 12, 6);
	anDice = loadAnimation(ssDice);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	noSmooth();

	let hancho = createSprite(width/2, height/2-200);
	hancho.addImage(iHancho);
	hancho.scale = 6;

	dices = new Group();

	let pX = 120;
	let startX = width/2 - pX;
	for(let i=0; i<3; i++){
		createDice(startX + i*pX, height/2+100);
	}

	autoZawa();
}

function draw() {
	background(33);

	for(let dice of dices){
		let rdm = floor(random(0, 6));
		dice.animation.changeFrame(rdm);
	}
	drawSprites();
	
	if(!isLooping()){
		if(dices[0].animation.getFrame() == dices[1].animation.getFrame() && 
			dices[0].animation.getFrame() == dices[2].animation.getFrame()){
			msg = "おめでとう!!";
		}else{
			msg = "残念でした!!";
		}
	}

	fill(255);
	textAlign(CENTER, TOP);
	textSize(64);
	text(msg, width/2, height/2 + 200);
}

function createDice(x, y){

	let dice = createSprite(x, y);
	dice.addAnimation("dice", anDice);
	dice.animation.stop();
	dice.scale = 8;
	dices.add(dice);
}

function autoZawa(){
	if(!isLooping()) return;
	let x = random(width);
	let y = random(height/2);
	let zawa = createSprite(x, y);
	zawa.addImage(iZawa);
	zawa.setSpeed(1, 180);
	zawa.scale = random(2, 4);
	zawa.life  = floor(random(8, 20));
	setTimeout(autoZawa, random(500, 1000));
}

function mousePressed(){

	if(isLooping()){
		noLoop();
	}else{
		loop();
		autoZawa();
		msg = "ゾロ目を出したら君の勝ちだよ...!!";
	}
}