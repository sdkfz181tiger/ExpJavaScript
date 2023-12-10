
const DIR = "./assets/";

let iRei;// 霊夢の画像データを格納する変数
let reimu;// 霊夢のスプライトを格納する変数

function preload(){
	iRei = loadImage(DIR + "y_rei.png");// 霊夢の画像
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	background(33);
	angleMode(DEGREES);// 1, 角度モードを変更

	// スプライト
	reimu = createSprite(width/2, height/2);
	reimu.addImage(iRei);
	reimu.debug = true;
	reimu.scale = 4;
}

function draw(){
	background(33);
	drawSprites();
}

function mousePressed(){

	let dX = mouseX - reimu.position.x;// 2-1, スプライトとマウスのx座標の差
	let dY = mouseY - reimu.position.y;// 2-2, スプライトとマウスのy座標の差
	let deg = atan2(dY, dX);// 2-3, スプライトとマウスの角度を求める
	console.log("角度は:" + deg);// 2-4, 角度を確認する
	reimu.setSpeed(5, deg);// 3, スプライトを移動させる
}