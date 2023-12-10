const BALL_SPD = 4; // ボールスピード
const BLOCK_W  = 50;// ブロック幅
const BLOCK_H  = 14;// ブロック高さ
const ROWS     = 3; // 行数
const COLS     = 7; // 列数

let cvs;       // キャンバス
let ball;      // ボール
let bar;       // コントローラー
let blockGroup;// ブロックグループ

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);

	// ボール
	ball = new Sprite(width/2, height/2);
	ball.diameter = 10;
	ball.color = "white";
	ball.collider = "dynamic";
	ball.layer = 1;
	ball.bounciness = 1;
	ball.speed = BALL_SPD;
	ball.direction = random(225, 315);
	
	// コントローラー
	bar = new Sprite(width/2, height - 50);
	bar.width = 70;
	bar.height = 14;
	bar.color = "white";
	bar.collider = "static";
	bar.layer = 9;// スプライトの重なり順
	bar.bounciness = 1;
	
	// ブロックグループ
	blockGroup = new Group();

	const sX = width/2 - (COLS-1)/2 * BLOCK_W;
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			const x = sX + BLOCK_W * c;
			const y = 50 + BLOCK_H * r;
			const block = new blockGroup.Sprite(x, y);
			block.width = BLOCK_W - 2;
			block.height = BLOCK_H - 2;
			block.color = "white";
			block.collider = "static";
			block.layer = 1;
			block.bounciness = 1;
		}
	}
}

function draw(){
	background("silver");// 背景色

	fill("black");
	noStroke();
	rect(0, 0, width, height);

	// ボール
	if(ball.x < 0) ball.vel.x *= -1;
	if(width < ball.x) ball.vel.x *= -1;
	if(ball.y < 0) ball.vel.y *= -1;
	if(height < ball.y) ball.vel.y *= -1;
	
	// コントローラー
	if(kb.pressing("left")){
		bar.x += -2;
	}
	if(kb.pressing("right")){
		bar.x += 2;
	}
	
	// コントローラー x ボール
	bar.collided(ball, (a, b)=>{
		b.speed = BALL_SPD;
		if(a.y < b.y){
			b.direction += a.x - b.x;
		}else{
			b.direction += b.x - a.x;
		}
	});

	// ブロック x ボール
	blockGroup.collided(ball, (a, b)=>{
		b.speed = BALL_SPD;
		a.remove();
	});
}