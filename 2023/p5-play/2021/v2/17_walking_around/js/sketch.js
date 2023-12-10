
const DIR = "./assets/";

let anFront, anBack, anLeft, anRight;
let iKoban;
let kobanGroup;// 小判グループ
let ninja;// 忍者

function preload(){
	let ssFront = loadSpriteSheet(DIR + "t_front.png", 16, 16, 5);// 前
	anFront = loadAnimation(ssFront);// アニメ作成
	let ssBack = loadSpriteSheet(DIR + "t_back.png", 16, 16, 5);// 後
	anBack = loadAnimation(ssBack);// アニメ作成
	let ssRight = loadSpriteSheet(DIR + "t_right.png", 16, 16, 5);// 左
	anRight = loadAnimation(ssRight);// アニメ作成
	let ssLeft = loadSpriteSheet(DIR + "t_left.png", 16, 16, 5);// 右
	anLeft = loadAnimation(ssLeft);// アニメ作成
	iKoban = loadImage(DIR + "koban.png");// 小判の画像
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	background(33);

	// 小判グループ
	kobanGroup = new Group();

	// スプライトをランダム配置
	for(let i=0; i<30; i++){
		let x = random(-width, width);// キャンバスの幅
		let y = random(-height, height);// キャンバスの高さ
		let koban = createSprite(x, y, 16, 16);// 小判スプライト
		koban.addImage(iKoban);// 小判の画像
		koban.debug = true;
		koban.scale = 4;
		kobanGroup.add(koban);// 小判グループに追加
	}

	// スプライト
	ninja = createSprite(width/2, height/2);
	ninja.addAnimation("front", anFront);// アニメ追加
	ninja.addAnimation("back", anBack);// アニメ追加
	ninja.addAnimation("left", anLeft);// アニメ追加
	ninja.addAnimation("right", anRight);// アニメ追加
	ninja.debug = true;
	ninja.scale = 4;
}

function draw(){
	background(33);
	drawSprites();

	// カメラの座標を忍者の座標に設定
	camera.position = ninja.position;

	// 小判グループ x 忍者
	kobanGroup.overlap(ninja, (a, b)=>{
		a.remove();// a(小判)を削除
		//b.remove();// b(忍者)を削除
	});
}

function keyPressed(){

	if(keyCode == 38){
		ninja.changeAnimation("back");// アニメ変更
		ninja.setSpeed(5, 270);// 上へ
	}
	if(keyCode == 40){
		ninja.changeAnimation("front");// アニメ変更
		ninja.setSpeed(5, 90);// 下へ
	}
	if(keyCode == 37){
		ninja.changeAnimation("left");// アニメ変更
		ninja.setSpeed(5, 180);// 左へ
	}
	if(keyCode == 39){
		ninja.changeAnimation("right");// アニメ変更
		ninja.setSpeed(5, 0);// 右へ
	}
}

function keyReleased(){

	ninja.setSpeed(0, 0);// 停止
}