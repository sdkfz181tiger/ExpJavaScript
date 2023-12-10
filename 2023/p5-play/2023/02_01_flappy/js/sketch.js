let cvs;// キャンバス
let player;// プレイヤー
let floor;// 床

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);
	world.gravity.y = 12;// 重力を設定する

	// プレイヤー
	player = new Sprite(width/2, height/2-100);
	player.width = 30;
	player.height = 30;
	player.color = "orange";
	player.image = "./assets/reimu_good_01.png";// 画像を設定する
	
	// 床
	floor = new Sprite(width/2, height/2+80);
	floor.width = 120;
	floor.height = 20;
	floor.color = "gray";
	floor.collider = "static";// 動かない物体
}

function draw(){
	background("silver");// 背景色
	// キーボード
	if(kb.presses("left")){
		//player.vel.x = -2;
		player.vel.y = -5;
	}
	if(kb.presses("right")){
		//player.vel.x = 2;
		player.vel.y = -5;
	}
}