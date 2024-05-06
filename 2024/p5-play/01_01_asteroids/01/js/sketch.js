
const THRUSTER = 0.04;
const SPD_BULLET = 3;

let cvs;// キャンバス
let cX, cY;// 中心座標

let player;
let bltGroup;

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);
	frameRate(60);// フレームレート
	cX = width / 2;
	cY = height / 2;

	p5play.renderStats = true;// Status

	// Player
	player = new Sprite(cX, cY);
	player.radius = 18;
	player.color = "blue";
	player.collider = "dynamic";
	player.image = "assets/reimu_good_01.png";
	player.debug = true;
	player.x = cX;
	player.y = cY;

	bltGroup = new Group();// Group
}

function draw(){
	background("gray");// 背景色

	// Keyboard
	if(kb.pressing("left")){
		player.rotation -= 4;
	}
	if(kb.pressing("right")){
		player.rotation += 4;
	}
	if(kb.pressing("up")){
		const rot = player.rotation - 90;
		player.vel.x += cos(rot) * THRUSTER;
		player.vel.y += sin(rot) * THRUSTER;
	}
	if(kb.pressing("z")){
		shot();
	}

	// Enemy x Shuriken
	// enemyGroup.collides(shrikenGroup, (a, b)=>{
	// 	a.remove();// a削除(敵)
	// 	b.remove();// b削除(手裏剣)
	// });

	if(player.x < 0) player.x = width;
	if(width < player.x) player.x = 0;
	if(player.y < 0) player.y = height;
	if(height < player.y) player.y = 0;
}

function keyPressed() {
	//console.log("keyPressed:", keyCode);
}

function shot(){
	const rot = player.rotation - 90;
	const x = player.x + player.radius * cos(rot) * 1.5;
	const y = player.y + player.radius * sin(rot) * 1.5;
	const blt = new bltGroup.Sprite(x, y);
	blt.radius = 4;
	blt.color = "blue";
	blt.collider = "dynamic";
	blt.life = 60;
	blt.vel.x = cos(rot) * SPD_BULLET;
	blt.vel.y = sin(rot) * SPD_BULLET;
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