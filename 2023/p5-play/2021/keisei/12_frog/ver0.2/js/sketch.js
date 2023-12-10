
const DIR = "./assets/";

const B_SIZE = 32;
const T_LENGTH = 256;

let anFrogAtk, anFrogEat, anFrogDead, anFly, anKemu;
let player, tongue, marker;
let bugs;

let seTongue, seBug, seHit;

function preload(){
	let ssFrogAtk = loadSpriteSheet(DIR + "s_frog_atk.png", 20, 30, 8);
	anFrogAtk = loadAnimation(ssFrogAtk);
	let ssFrogEat = loadSpriteSheet(DIR + "s_frog_eat.png", 20, 30, 8);
	anFrogEat = loadAnimation(ssFrogEat);
	let ssFrogDead = loadSpriteSheet(DIR + "s_frog_dead.png", 20, 30, 16);
	anFrogDead = loadAnimation(ssFrogDead);
	let ssFly = loadSpriteSheet(DIR + "s_fly.png", 15, 10, 6);
	anFly = loadAnimation(ssFly);
	let ssKemu = loadSpriteSheet(DIR + "s_kemu.png", 9, 12, 8);
	anKemu = loadAnimation(ssKemu);
	seTongue = loadSound(DIR + "se_tongue.mp3");
	seBug = loadSound(DIR + "se_bug.mp3");
	seHit = loadSound(DIR + "se_hit.mp3");
}

function setup(){
	createCanvas(480, 320);
	noSmooth();
	frameRate(48);
	angleMode(DEGREES);

	// Player
	player = createSprite(width/2, height-64, B_SIZE, B_SIZE);
	player.addAnimation("atk", anFrogAtk);
	player.addAnimation("eat", anFrogEat);
	player.addAnimation("dead", anFrogDead);
	player.scale = 4;
	player.animation.stop();

	tongue = createSprite(player.position.x, player.position.y, 4, 4);
	tongue.shapeColor = color(200, 33, 33);
	tongue.visible = false;
	marker = createSprite(player.position.x, player.position.y, 20, 20);
	marker.shapeColor = color(33, 200, 33);
	marker.visible = false;

	// Bugs
	bugs = new Group();
	for(let i=0; i<10; i++){
		const x = random(width);
		const y = random(height/2) * -1.0;
		bugs.add(createBug(x, y));
	}
}

function draw(){
	background(0, 99, 99);
	drawSprites();// Sprites

	// Flip
	const flip = (mouseX < player.position.x)?-1:1;
	player.mirrorX(flip);

	// Tongue
	const mX = marker.position.x;
	const mY = marker.position.y;
	const tX = tongue.position.x;
	const tY = tongue.position.y;
	tongue.position.x += (mX-tX) / 5;
	tongue.position.y += (mY-tY) / 5;
	if(calcDistance(tongue, marker) < 4){
		marker.position.x = player.position.x;
		marker.position.y = player.position.y;
	}else{
		strokeWeight(6);
		stroke(200, 33, 33);
		const pX = player.position.x;
		const pY = player.position.y;
		const tX = tongue.position.x;
		const tY = tongue.position.y;
		line(pX, pY, tX, tY);
		noStroke();
		fill(200, 33, 33);
		circle(tX, tY, 20);
	}

	// Bugs
	for(let bug of bugs){

		// Bugs x Tongue
		const tX = tongue.position.x;
		const tY = tongue.position.y;
		if(bug.overlapPoint(tX, tY)){
			bug.setSpeed(0, 0);
			bug.position = tongue.position;
		}

		if(calcDistance(bug, player) < 14){
			bug.remove();
			changeAnimation("eat");// Animation
			//seHit.play();// Sound
		}
		
		if(height < bug.position.y){
			bug.position.x = random(width);
			bug.position.y = 0;
			bug.velocity.y = random(1, 4);
			//seBug.play();// Sound
		}
	}
}

function mousePressed(){
	// Tongue
	tongue.position.x = player.position.x;
	tongue.position.y = player.position.y;
	marker.position.x = mouseX;
	marker.position.y = mouseY;
	changeAnimation("atk");// Animation
	//seTongue.play();// Sound
}

function createBug(x, y){
	let bug = createSprite(x, y);
	bug.addAnimation("fly", anFly);
	//bug.addAnimation("kemu", anKemu);
	bug.scale = 4;
	bug.velocity.y = random(1, 4);
	return bug;
}

function calcDistance(a, b){
	let dX = a.position.x - b.position.x;
	let dY = a.position.y - b.position.y;
	return sqrt(dX*dX + dY*dY);
}

function changeAnimation(tag){
	player.changeAnimation(tag);
	player.animation.changeFrame(0);
	player.animation.play();
	player.animation.looping = false;
}
