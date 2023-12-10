
const DIR = "./assets/";

let anFront, anBack, anLeft, anRight;
let ninja;

function preload(){
	// 前
	let ssFront = loadSpriteSheet(DIR + "t_front.png", 16, 16, 5);
	anFront = loadAnimation(ssFront);// アニメ作成
	// 後
	let ssBack = loadSpriteSheet(DIR + "t_back.png", 16, 16, 5);
	anBack = loadAnimation(ssBack);// アニメ作成
	// 左
	let ssRight = loadSpriteSheet(DIR + "t_right.png", 16, 16, 5);
	anRight = loadAnimation(ssRight);// アニメ作成
	// 右
	let ssLeft = loadSpriteSheet(DIR + "t_left.png", 16, 16, 5);
	anLeft = loadAnimation(ssLeft);// アニメ作成
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(16);
	background(33);

	// スプライト
	ninja = createSprite(width/2, height/2);
	ninja.addAnimation("front", anFront);// アニメ追加
	ninja.addAnimation("back", anBack);// アニメ追加
	ninja.addAnimation("left", anLeft);// アニメ追加
	ninja.addAnimation("right", anRight);// アニメ追加
	ninja.scale = 8;
}

function draw(){
	background(33);
	drawSprites();
}

function keyPressed(){
	console.log(keyCode);

	if(keyCode == 38){
		ninja.changeAnimation("back");// アニメ変更
	}
	if(keyCode == 40){
		ninja.changeAnimation("front");// アニメ変更
	}
	if(keyCode == 37){
		ninja.changeAnimation("left");// アニメ変更
	}
	if(keyCode == 39){
		ninja.changeAnimation("right");// アニメ変更
	}
}