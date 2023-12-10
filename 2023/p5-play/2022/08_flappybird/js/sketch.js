
const TITLE = "FlappyBird";

const GRAVITY = 0.8;
const P_COIN_X = 150;
const P_TNL_Y = 50;
const P_GRD_X = 160;

let bkgGroup, coinGroup, tnlGroup, grdGroup;
let sndJump, sndCoin, sndOmg;
let ready, bird, score;

function preload(){

	// アニメーション
	loadAni("ready", "./assets/fb_ready.png");
	loadAni("fly", "./assets/fb_bird_01.png", 3);
	loadAni("bkg", "./assets/fb_bkg.png");
	loadAni("grd", "./assets/fb_grd.png");
	loadAni("tunnel", "./assets/fb_tunnel.png");
	loadAni("coin", "./assets/fb_coin.png");

	// グループ
	bkgGroup = new Group();
	coinGroup = new Group();
	tnlGroup = new Group();
	grdGroup = new Group();

	// サウンド
	sndJump = loadSound("./assets/se_jump.mp3");
	sndCoin = loadSound("./assets/se_coin.mp3");
	sndOmg = loadSound("./assets/se_omg.mp3");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(32);
	noSmooth();
	noStroke();
	noLoop();

	// 全てのスプライト
	allSprites.collider = "static";
	allSprites.shapeColor = color("silver");

	// 背景
	createBkg(width/2);

	// Readyタイトル
	ready = new Sprite("ready", width/2, height/2, 16, "none");

	// バード
	bird = new Sprite("fly", width/2, height/2, 16, "dynamic");
	bird.rotationLock = true;
	bird.rotation = 90;

	// スコア
	score = 0;

	// コイン x バード
	coinGroup.overlap(bird, (a, b)=>{
		console.log("Coin x Bird");
		if(!a.visible) return;
		a.visible = false;// Invisible
		sndCoin.play();// Sound
		score += 1;// Score
	});

	// トンネル x バード
	tnlGroup.overlap(bird, (a, b)=>{
		console.log("Tunnel x Bird");
		gameOver();// GameOver
	});

	// 地面 x バード
	grdGroup.collide(bird, (a, b)=>{
		console.log("Ground x Bird");
		gameOver();// GameOver
	});

	// トンネル x 地面
	tnlGroup.overlap(grdGroup);

	// コインとトンネル
	createCoinAndTunnel(width/2 + P_COIN_X*1);
	createCoinAndTunnel(width/2 + P_COIN_X*2);
	createCoinAndTunnel(width/2 + P_COIN_X*3);

	// 地面
	createGround(width/2);
}

function draw(){
	background("skyblue");
	drawTitle();

	const left = camera.x - width/2 - 100;

	// 重力
	bird.vel.y += GRAVITY;
	bird.rotation = bird.vel.y * 4;

	// カメラ
	camera.on();
	camera.x = bird.x;// カメラ中心x
	camera.off();

	// 次のy座標
	let nextY = 0;

	// 地面スクロール
	for(let bkg of bkgGroup){
		if(bkg.x < left) bkg.x += width * 2;
	}

	// コイン
	for(let coin of coinGroup){
		if(coin.x < left){
			nextY = random(150, height-150);// ランダム
			coin.x += P_COIN_X*3;
			coin.y = nextY;
			coin.visible = true;// 非表示
		}
	}

	// トンネル
	for(let tnl of tnlGroup){
		if(tnl.x < left){
			tnl.x += P_COIN_X*3;
			if(tnl.tag == "a"){
				tnl.y = nextY - P_TNL_Y - 180;
			}
			if(tnl.tag == "b"){
				tnl.y = nextY + P_TNL_Y + 180;
			}
		}
	}

	// 地面
	for(let grd of grdGroup){
		if(grd.x < left) grd.x += P_GRD_X * 4;
	}

	// Debug
	//allSprites.debug = mouse.pressing();
}

function mousePressed(){
	console.log("mousePressed");

	// タップでスタート
	if(!isLooping()){
		ready.remove();
		loop();
	}

	// ジャンプ
	if(isLooping()){
		bird.vel.x = 2;
		bird.vel.y = -8;
		sndJump.play();
	}
}

function createCoinAndTunnel(x){
	// コイン、トンネル
	const y = random(150, height-150);
	const coin = new coinGroup.Sprite("coin", x, y, 12, 16);
	const tnla = new tnlGroup.Sprite("tunnel", x, y-P_TNL_Y-180, 52, 360);
	tnla.tag = "a";// Tag
	const tnlb = new tnlGroup.Sprite("tunnel", x, y+P_TNL_Y+180, 52, 360);
	tnlb.tag = "b";// Tag
}

function createBkg(x){
	// 背景
	const bkg1 = new bkgGroup.Sprite("bkg", x+width/2*-1, height/4*3, width, height, "none");
	const bkg2 = new bkgGroup.Sprite("bkg", x+width/2*0,  height/4*3, width, height, "none");
	const bkg3 = new bkgGroup.Sprite("bkg", x+width/2*1,  height/4*3, width, height, "none");
	const bkg4 = new bkgGroup.Sprite("bkg", x+width/2*2,  height/4*3, width, height, "none");
}

function createGround(x){
	// 地面
	const grd1 = new grdGroup.Sprite("grd", x+P_GRD_X*-1, height, 160, 100);
	const grd2 = new grdGroup.Sprite("grd", x+P_GRD_X*0,  height, 160, 100);
	const grd3 = new grdGroup.Sprite("grd", x+P_GRD_X*1,  height, 160, 100);
	const grd4 = new grdGroup.Sprite("grd", x+P_GRD_X*2,  height, 160, 100);
}

function drawTitle(){
	fill(255);
	// タイトル
	textAlign(CENTER, TOP);
	textSize(40);
	text(TITLE, width/2, 20);
	// スコア
	textAlign(CENTER, TOP);
	textSize(60);
	text(score, width/2, 80);
}

function gameOver(){
	fill(255);
	textAlign(CENTER, CENTER);
	textSize(20);
	text("Game Over", width/2, height/2);
	sndOmg.play();// サウンド
	noLoop();
}
