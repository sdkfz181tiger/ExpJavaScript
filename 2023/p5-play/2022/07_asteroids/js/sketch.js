
const TITLE = "Asteroids";

let astGroup, bltGroup;
let sndShot;
let ship;

function preload(){

	// アニメーション
	loadAni("a_ship", "./assets/ast_ship_01.png", 3);
	loadAni("a_moon", "./assets/ast_moon_01.png", 1);

	// グループ
	astGroup = new Group();
	bltGroup = new Group();

	// サウンド
	sndShot = loadSound("./assets/se_shot.mp3");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noSmooth();
	noStroke();

	// 全てのスプライト
	allSprites.collider = "dynamic";
	allSprites.shapeColor = color("white");

	// 宇宙船
	ship = new Sprite(width/2, height/2, 32, 32);
	ship.ani = "a_ship";// アニメーション

	// 宇宙船と弾の接触
	ship.overlap(bltGroup);

	// 隕石と宇宙船の接触
	astGroup.overlap(ship, (a, b)=>{
		noLoop();// ゲームオーバー
	});

	// 隕石と弾の接触
	astGroup.overlap(bltGroup, (a, b)=>{
		a.remove();// 隕石の削除
		b.remove();// 弾の削除
		createAsteroid(a.x, a.y, a.scale*0.8);// 隕石の生成1
		createAsteroid(a.x, a.y, a.scale*0.8);// 隕石の生成2
	});

	// 隕石の生成(5つ)
	for(let i=0; i<5; i++){
		createAsteroid(0, 0, 1.2);
	}
}

function draw(){
	background(33);
	drawInfo();

	// 宇宙船の操作
	if(kb.pressing("a")){
		ship.rotation -= 5;
		ship.rotationSpeed = 0;
	}
	if(kb.pressing("d")){
		ship.rotation += 5;
		ship.rotationSpeed = 0;
	}
	if(kb.pressing("w")){
		ship.addSpeed(0.2, ship.rotation);// 宇宙船を加速
	}
	if(kb.pressing("k")){
		createBullet();// 弾を発射
	}

	// キャンバス外に出たスプライトを反対側へ
	for(let sprite of allSprites){
		if(width < sprite.x) sprite.x = 0;
		if(sprite.x < 0) sprite.x = width;
		if(height < sprite.y) sprite.y = 0;
		if(sprite.y < 0) sprite.y = height;
	}

	// Debug
	allSprites.debug = mouse.pressing();
}

function createAsteroid(x, y, scale){
	if(scale < 0.5) return;// スケール制限
	let asteroid = new astGroup.Sprite(x, y, 36);
	asteroid.ani = "a_moon";
	asteroid.speed = random(1, 4);
	asteroid.direction = random(360);
	asteroid.scale = scale;
}

function createBullet(){
	if(0 < bltGroup.length) return;// 弾数制限
	let bullet = new bltGroup.Sprite(ship.x, ship.y, 4);
	bullet.speed = 8;
	bullet.direction = ship.rotation;
	bullet.life = 32;// 32フレーム後に自動削除
	sndShot.play();// サウンド再生
}

function drawInfo(){
	fill(255);
	// タイトル
	textAlign(CENTER, TOP);
	textSize(40);
	text(TITLE, width/2, 20);
	// Howto
	textAlign(CENTER, BOTTOM);
	textSize(20);
	text("A:turnL, D:turnR, W:move, K:shot", width/2, height-20);
}
