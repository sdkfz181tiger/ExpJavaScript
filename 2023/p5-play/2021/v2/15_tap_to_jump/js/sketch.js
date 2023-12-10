
const DIR = "./assets/";

let iRei;// 霊夢の画像データを格納する変数
let reimu;// 霊夢のスプライトを格納する変数

function preload(){
	iRei = loadImage(DIR + "c_rei.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	background(33);

	// 霊夢のスプライト
	reimu = createSprite(width/2, height/2);
	reimu.addImage(iRei);
	reimu.debug = true;
	reimu.scale = 4;
}

function draw(){
	background(33);
	drawSprites();

	if(reimu.position.y < 400){// 400よりy座標が小さかったら
		reimu.velocity.y += 1;// y速度に+1する(重力)
	}else{
		reimu.velocity.y = 0;// y速度を0にする(止める)
		reimu.position.y = 400;// y座標を400にする
	}
}

function mousePressed(){
	console.log("mousePressed!!");
	reimu.velocity.y = -10;// y速度を設定する
}