
const TITLE = "Pong";

let wallGroup;
let sndScore;
let ball, pLeft, pRight;
let scoreL, scoreR;

function preload(){

	// グループ
	wallGroup = new Group();
	// サウンド
	sndScore = loadSound("./assets/se_score.mp3");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	noSmooth();
	noStroke();

	// 全てのスプライト
	allSprites.collider = "static";
	allSprites.shapeColor = color("white");

	// キャンバス上下左右の壁
	const wLeft = new wallGroup.Sprite(0, height/2, 10, height);
	const wRight = new wallGroup.Sprite(width, height/2, 10, height);
	const wTop = new wallGroup.Sprite(width/2, 0, width, 10);
	const wBottom = new wallGroup.Sprite(width/2, height, width, 10);

	// ボール
	ball = new Sprite(width/2, height/2, 10, "dynamic");
	ball.rotationLock = true;
	ball.bounciness = 1;
	ball.friction = 0;
	ball.speed = 4;
	ball.direction = (random()<0.5) ? 0:180;

	// 左パドル
	pLeft = new Sprite(40, height/2, 10, 90);
	pLeft.shapeColor = color("blue");

	// 右パドル
	pRight = new Sprite(width-40, height/2, 10, 90);
	pRight.shapeColor = color("red");

	// 左右パドルとボールの衝突
	pLeft.collide(ball, ()=>{
		ball.direction += 10 - random() * 20;// ランダム
	});
	pRight.collide(ball, ()=>{
		ball.direction += 10 - random() * 20;// ランダム
	});

	// スコアの初期化
	scoreL = 0;
	scoreR = 0;

	// 左右の壁とボールの衝突
	wLeft.collide(ball, ()=>{
		scoreR++;// スコア加算
		sndScore.play();// サウンド再生
	});
	wRight.collide(ball, ()=>{
		scoreL++;// スコア加算
		sndScore.play();// サウンド再生
	});
}

function draw(){
	background(33);
	drawInfo();// 各情報の表示

	// ネットの描画
	for(let i=0; i<height; i+=12){
		square(width/2, i, 4);
	}

	// 左パドルの操作
	if(kb.pressing("a")) pLeft.y -= 12;
	if(kb.pressing("z")) pLeft.y += 12;
	// 右パドルの操作
	if(kb.pressing("k")) pRight.y -= 12;
	if(kb.pressing("m")) pRight.y += 12;
}

function drawInfo(){
	fill(255);
	// タイトルとスコア
	textAlign(CENTER, TOP);
	textSize(40);
	text(TITLE, width/2, 20);
	text(scoreL, width/4*1, 40);
	text(scoreR, width/4*3, 40);
	// Howtoプレイ
	textSize(16);
	textAlign(LEFT, BOTTOM);
	text("Blue -> A:up, Z:down", 10, height-10);
	textAlign(RIGHT, BOTTOM);
	text("Red -> K:up, M:down", width-10, height-10);
}
