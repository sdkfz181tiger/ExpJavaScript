
let player;

let topA, btmA;
let topB, btmB;

let score = 0;
let speed = 3;
let grdY = 0;

function preload(){
	
}

function setup(){
	createCanvas(160, 240);
	angleMode(DEGREES);
	frameRate(24);
	noLoop();
}

function draw(){
	background(100, 150, 250);

	scrollBackground();

	// 3-3, プレイヤーの動き1
	if(player.position.y < grdY){
		player.velocity.y += 2;
		player.rotation = player.velocity.y * 3;
	}else{
		player.velocity.y = 0;
		player.position.y = grdY;
	}

	// 4-2, トンネルAの動き
	if(topA.position.x <= 0){
		topA.position.x = width;
		topA.position.y = random(-100, 100);
		score += 1;
	}
	btmA.position.x = topA.position.x;
	btmA.position.y = topA.position.y + topA.height + 100;

	// 5-2, トンネルBの動き
	if(topB.position.x <= 0){
		topB.position.x = width;
		topB.position.y = random(-100, 100);
		score += 1;
	}
	btmB.position.x = topB.position.x;
	btmB.position.y = topB.position.y + topB.height + 100;

	// 6, 衝突判定
	if(collideTunnels(player, topA, btmA, topB, btmB)){
		gameOver();
	}

	drawSprites();
	showScore(score);
}

function mousePressed(){

	// Game
	gameStart();

	// 3-4, プレイヤーの動き2
	player.setSpeed(10, 270);
	seJump.play();
}