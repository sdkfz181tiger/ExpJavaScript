
const ROWS = 3;
const COLS = 5;
const PAD_Y = 60;

let cvs;// キャンバス
let player;// プレイヤー
let enemyGroup;// 敵グループ
let bltGroup;// 弾丸グループ
let dirX;// 移動方向

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);

	// プレイヤー
	player = new Sprite(width/2, height - 50);
	player.width = 30;
	player.height = 30;
	player.image = "./assets/reimu_good_01.png";// 画像を設定する
	player.collider = "static";
	player.debug = true;

	// 敵グループ
	enemyGroup = new Group();

	const sX = width/2 - (COLS-1)/2 * PAD_Y;
	const sY = 40;
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			const x = sX + PAD_Y * c;
			const y = sY + PAD_Y * r;
			const enemy = new enemyGroup.Sprite(x, y);
			enemy.image = "./assets/marisa_good_01.png";
			enemy.collider = "static";
			enemy.debug = true;
		}
	}

	// 弾丸グループ
	bltGroup = new Group();

	// 移動方向
	dirX = (random() < 0.5) ? -1:1;
}

function draw(){
	background("silver");// 背景色

	// キーボード
	if(kb.pressing("left")){
		player.x -= 2;
		player.scale.x = -1;
	}
	if(kb.pressing("right")){
		player.x += 2;
		player.scale.x = 1;
	}
	if(kb.pressing("up")){
		shot();
	}

	// 敵グループ
	let turnFlg = false;
	for(let enemy of enemyGroup){
		enemy.x += dirX;
		enemy.scale.x = dirX;
		if(enemy.x < 0 || width < enemy.x){
			turnFlg = true;
		}
	}
	if(turnFlg){
		dirX *= -1;
		for(let enemy of enemyGroup) enemy.y += PAD_Y / 10;
	}

	// 衝突判定
	enemyGroup.collided(bltGroup, (a, b)=>{
		a.remove();
		b.remove();
	});
}

function shot(){
	const blt = new bltGroup.Sprite(player.x, player.y - 30);
	blt.width = 8;
	blt.height = 8;
	blt.color = "white";
	blt.collider = "dynamic";
	blt.vel.y = -4;
	blt.life = 64;
}