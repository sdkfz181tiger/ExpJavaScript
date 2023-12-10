const BALL_SPD = 4; // ボールスピード

let cvs;       // キャンバス
let ball;      // ボール
let barL, barR;// コントローラー

let scoreL, scoreR;// スコア
let lblL, lblR;// ラベル

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);

	// ボール
	ball = new Sprite(width/2, height/2);
	ball.diameter = 10;
	ball.color = "white";
	ball.collider = "dynamic";
	ball.layer = 2;
	ball.bounciness = 1;
	ball.speed = BALL_SPD;
	ball.direction = random(360);

	// コントローラー
	barL = new Sprite(80, height/2);
	barL.width = 14;
	barL.height = 70;
	barL.color = "white";
	barL.collider = "static";
	barL.layer = 3;// スプライトの重なり順
	barL.bounciness = 1;

	barR = new Sprite(width-80, height/2);
	barR.width = 14;
	barR.height = 70;
	barR.color = "white";
	barR.collider = "static";
	barR.layer = 3;// スプライトの重なり順
	barR.bounciness = 1;

	// スコア
	scoreL = 0;
	scoreR = 0;

	// ラベル
	lblL = new Sprite(width/2-100, 50);
	lblL.color = "#00000000";
	lblL.stroke = "#00000000";
	lblL.collider = "none";
	lblL.layer = 1;
	lblL.textSize = 48;
	lblL.textColor = "white";
	lblL.text = scoreL;

	lblR = new Sprite(width/2+100, 50);
	lblR.color = "#00000000";
	lblR.stroke = "#00000000";
	lblR.collider = "none";
	lblR.layer = 1;
	lblR.textSize = 48;
	lblR.textColor = "white";
	lblR.text = scoreR;
}

function draw(){
	background("silver");// 背景色

	fill("black");
	noStroke();
	rect(0, 0, width, height);

	stroke("white");
	strokeWeight(2);
	line(width/2, 0, width/2, height);
	noStroke();

	// ボール
	if(ball.x < 0){
		ball.vel.x *= -1;
		scoreR += 1;// スコアを加算する
		lblR.text = scoreR;
	}
	if(width < ball.x){
		ball.vel.x *= -1;
		scoreL += 1;// スコアを加算する
		lblL.text = scoreL;
	}
	if(ball.y < 0) ball.vel.y *= -1;
	if(height < ball.y) ball.vel.y *= -1;

	// コントローラー
	if(kb.pressing("a")){
		barL.y += -2;
	}
	if(kb.pressing("z")){
		barL.y += 2;
	}
	if(kb.pressing("k")){
		barR.y += -2;
	}
	if(kb.pressing("m")){
		barR.y += 2;
	}

	// コントローラー x ボール
	barL.collided(ball, (a, b)=>{
		b.speed = BALL_SPD;
		if(a.x < b.x){
			b.direction += b.y - a.y;
		}else{
			b.direction += a.y - b.y;
		}
	});
	barR.collided(ball, (a, b)=>{
		b.speed = BALL_SPD;
		if(a.x < b.x){
			b.direction += b.y - a.y;
		}else{
			b.direction += a.y - b.y;
		}
	});
}