
const DIR = "./assets/";

let iRei;// 霊夢の画像データを格納する変数
let reimu;// 霊夢のスプライトを格納する変数
let wallGroup;

const SPD = 5;
const PAD = 140;
const INTERVAL = 60;

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
	reimu.velocity.x = 5;// x方向の速度変更

	// if(random() < 0.5){
	// 	reimu.velocity.x = SPD;// x方向の速度
	// 	reimu.mirrorX(1);// x方向にスプライト反転
	// }else{
	// 	reimu.velocity.x = -SPD;// x方向の速度
	// 	reimu.mirrorX(-1);// x方向にスプライト反転
	// }

	// wallGroup = new Group();// Group

	// let wallL = createSprite(width/2 - PAD, height/2, 50, height);
	// wallL.debug = true;
	// wallGroup.add(wallL);

	// let wallR = createSprite(width/2 + PAD, height/2, 50, height);
	// wallR.debug = true;
	// wallGroup.add(wallR);
}

function draw(){
	background(33);
	drawSprites();
	/*
	// Frame countが、intervalで割り切れる時
	if(frameCount % INTERVAL == 0){
		// 敵出現
		let x = width / 2;// 中央
		if(random() < 0.5){// randomが0.5より小さければ...
			x += PAD;// 右側に
		}else{
			x -= PAD;// 左側に
		}
		let w = random(200, 320);// バーの太さランダム
		let bar = createSprite(x, 0, w, 16);
		bar.velocity.y = 6;
		wallGroup.add(bar);
	}

	// WallGroup x Reimu
	if(wallGroup.overlap(reimu)){
		noLoop();// Game Over!!
	}
	*/
}

function mousePressed(){
	console.log("mousePressed!!");

	reimu.velocity.x *= -1;// x方向の速度反転
	// if(reimu.velocity.x < 0){// x方向にスプライト反転
	// 	reimu.mirrorX(1);
	// }else{
	// 	reimu.mirrorX(-1);
	// }
}