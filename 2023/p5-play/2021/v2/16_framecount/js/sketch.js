
const DIR = "./assets/";

let iRei;// 霊夢の画像データを格納する変数
let id;// 定期実行id

function preload(){
	iRei = loadImage(DIR + "c_rei.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	background(33);
}

function draw(){
	background(33);
	drawSprites();

	// console.log(frameCount);// フレームカウント
	// if(frameCount%30 == 0){// 30で割り切れる時
	// 	console.log("割り切れる!!");
	// 	createReimu();// 霊夢のスプライトを作る関数を実行
	// }
}

function mousePressed(){
	// 100ミリ秒おきに霊夢のスプライトを作る関数を実行
	id = setInterval(()=>{
		createReimu();
	}, 100);
}

function mouseReleased(){
	// 定期実行を止める
	clearInterval(id);
}

function createReimu(){
	// 霊夢のスプライト
	let reimu = createSprite(width/2, height/2);
	reimu.addImage(iRei);
	reimu.debug = true;
	reimu.scale = 2;
	reimu.setSpeed(random(5), random(360));// ランダムでどこかへ
}