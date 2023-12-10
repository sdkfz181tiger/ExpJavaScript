let cvs;// キャンバス
let player;// プレイヤー
let start;// スタート床
let bkgGroup;// 背景グループ

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
	player.layer = 9;// スプライトの重なり順
	player.debug = true;

	// スタート床
	start = new Sprite(width/2, height/2+60);
	start.width = 90;
	start.height = 20;
	start.color = "gray";
	start.collider = "static";
	start.layer = 9;// スプライトの重なり順

	// 背景グループ
	bkgGroup = new Group();
	bkgGroup.layer = 1;// スプライトの重なり順

	for(let i=0; i<2; i++){
		const x = i * width;
		const bkg = new bkgGroup.Sprite(x, height/2);
		bkg.width = 480;
		bkg.height = 320;
		bkg.collider = "none";
		bkg.image = "./assets/fb_bkg_480x320.png";
	}
}

function draw(){
	background("silver");// 背景色
	// キーボード
	if(kb.presses("left")){
		player.vel.x = -2;
		player.vel.y = -5;
		player.rotateSpeed = 0;
	}
	if(kb.presses("right")){
		player.vel.x = 2;
		player.vel.y = -5;
	}
	// カメラ
	camera.x = player.x;// プレイヤーと同じx座標に

	// 背景
	for(let bkg of bkgGroup){
		if(bkg.x < player.x - width){
			bkg.x += width * 2;
		}
	}
}