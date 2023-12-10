let cvs;// キャンバス
let player;// プレイヤー
let enemy;// 敵キャラクター

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);

	// プレイヤー
	player = new Sprite(width/2-130, height/2);
	player.width = 30;
	player.height = 30;
	player.color = "orange";
	player.image = "./assets/reimu_good_01.png";// 画像を設定する
	
	// 敵キャラクター
	enemy = new Sprite(width/2+130, height/2);
	enemy.width = 30;
	enemy.height = 30;
	enemy.color = "aqua";
	enemy.image = "./assets/marisa_good_01.png";// 画像を設定する
}

function draw(){
	background("silver");// 背景色
	// キーボード
	if(kb.presses("left")){
		player.vel.x = -2;
		player.vel.y = 0;
	}
	if(kb.presses("right")){
		player.vel.x = 2;
		player.vel.y = 0;
	}
	if(kb.presses("up")){
		player.vel.x = 0;
		player.vel.y = -2;
	}
	if(kb.presses("down")){
		player.vel.x = 0;
		player.vel.y = 2;
	}
	// 衝突判定
	player.collides(enemy, (a, b)=>{
		b.remove();// 敵を消す
	});
}