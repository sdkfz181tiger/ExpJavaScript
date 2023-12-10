
const TITLE = "Breakout";

let wallGroup, blockGroup;
let sndScore;
let ball, paddle;
let score;

function preload(){
	// グループ
	wallGroup = new Group();
	blockGroup = new Group();
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

	// グループ
	const wLeft = new wallGroup.Sprite(0, height/2, 10, height);
	const wRight = new wallGroup.Sprite(width, height/2, 10, height);
	const wTop = new wallGroup.Sprite(width/2, 0, width, 10);
	const wBottom = new wallGroup.Sprite(width/2, height, width, 10);

	// ブロック
	const rows = 5;
	const cols = 10;
	const bWidth = 30;
	const bHeight = 15;
	const sX = width / 2 - bWidth*(cols-1)/2;
	const sY = height / 4;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = sX + bWidth * c;
			const y = sY + bHeight * r;
			const block = new blockGroup.Sprite(x, y, bWidth-2, bHeight-2);
			block.rotationLock = true;
			block.bounciness = 1;
			block.friction = 0;
		}
	}

	// ボール
	ball = new Sprite(width/2, height/2, 10, "dynamic");
	ball.rotationLock = true;
	ball.bounciness = 1;
	ball.friction = 0;
	ball.speed = 4;
	ball.direction = 45 + random() * 90;

	// ブロックとボールの衝突
	blockGroup.collide(ball, (a, b)=>{
		console.log("Hit!!");
		a.remove();// ブロックを削除
		b.speed += 0.1;// ボールを加速
		score += 10;// スコアを加算
		sndScore.play();// サウンドの再生
	});

	// パドル
	paddle = new Sprite(width/2, height*0.9, 80, 10);

	// パドルとボールの衝突
	paddle.collide(ball, ()=>{
		ball.direction += 10 - random() * 20;// ランダム
	});

	// スコアの初期化
	score = 0;
}

function draw(){
	background(33);
	drawInfo();

	// パドルの操作
	if(kb.pressing("z")) paddle.x -= 12;
	if(kb.pressing("x")) paddle.x += 12;
}

function drawInfo(){
	fill(255);
	// タイトル
	textAlign(CENTER, TOP);
	textSize(40);
	text(TITLE, width/2, 20);
	// スコア
	textAlign(LEFT, TOP);
	textSize(20);
	text("SCORE:" + score, 20, 20);
	// Howto
	textAlign(RIGHT, TOP);
	textSize(20);
	text("Z:left, X:right", width-20, 20);
}
