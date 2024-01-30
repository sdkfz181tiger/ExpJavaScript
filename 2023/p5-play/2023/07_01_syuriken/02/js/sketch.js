
let cvs;// キャンバス
let cX, cY;// 中心座標

let player;
let enemyGroup;
let shrikenGroup;

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);
	frameRate(60);// フレームレート
	cX = width / 2;
	cY = height / 2;

	player = new Sprite(cX, cY);
	player.radius = 16;
	player.color = "blue";
	player.collider = "dynamic";
	player.x = cX;
	player.y = cY;

	enemyGroup = new Group();
	for(let i=0; i<5; i++){
		const x = random(width);
		const y = random(height)
		createEnemy(x, y);
	}

	shrikenGroup = new Group();
}

function draw(){
	background("silver");// 背景色

	// 手裏剣発射!!
	if(frameCount%10 == 0){
		const deg = random(360);
		createShuriken(2, deg);
	}

	// Enemy x Shuriken
	enemyGroup.collides(shrikenGroup, (a, b)=>{
		a.remove();// a削除(敵)
		b.remove();// b削除(手裏剣)
	});

	renderStats();// ステータス
}

function mouseClicked() {
	console.log("mouseClicked:", mouseX, mouseY);
}

function createEnemy(x, y){
	const spr = new enemyGroup.Sprite(x, y);
	spr.radius = 16;
	spr.mass = 99;
	spr.color = "red";
	spr.collider = "dynamic";
	return spr;
}

function createShuriken(spd, deg){
	const x = player.x + player.diameter * 0.8 * cos(deg);
	const y = player.y + player.diameter * 0.8 * sin(deg);
	const spr = new shrikenGroup.Sprite(x, y);
	spr.radius = 8;
	spr.mass = 0;
	spr.color = "green";
	spr.collider = "dynamic";
	spr.velocity.x = spd * cos(deg);
	spr.velocity.y = spd * sin(deg);
	return spr;
}