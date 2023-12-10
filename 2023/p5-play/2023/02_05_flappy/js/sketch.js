let cvs;// キャンバス
let player;// プレイヤー
let start;// スタート床
let bkgGroup;// 背景グループ
let tnlGroup;// 土管グループ

let scoreNum;// スコア
let scoreLabel;// スコアラベル

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);
	world.gravity.y = 12;// 重力を設定する

	// プレイヤー
	player = new Sprite(width/2, height/2);
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
	
	// 土管グループ
	tnlGroup = new Group();
	tnlGroup.layer = 2;// スプライトの重なり順

	const padX = width / 2;// 土管のx間隔
	const padY = 240;      // 上下土管の間隔
	for(let i=0; i<3; i++){// 3列作ります
		const x = i * padX + width;// 土管のx座標
		const y = height / 2;// 土管のy座標
		// 上の土管
		const tnlA = new tnlGroup.Sprite(x, y - padY);
		tnlA.width = 52;
		tnlA.height = 360;
		tnlA.collider = "static";
		tnlA.image = "./assets/fb_tunnel.png";
		// 下の土管
		const tnlB = new tnlGroup.Sprite(x, y + padY);
		tnlB.width = 52;
		tnlB.height = 360;
		tnlB.collider = "static";
		tnlB.image = "./assets/fb_tunnel.png";
	}

	// スコア
	scoreNum = 0;

	// スコアラベル
	scoreLabel = new Sprite(width/2, 32);
	scoreLabel.color = "#00000000";
	scoreLabel.stroke = "#00000000";
	scoreLabel.collider = "none";
	scoreLabel.layer = 4;
	scoreLabel.textSize = 48;
	scoreLabel.textColor = "white";
	scoreLabel.text = scoreNum;
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

	// 土管グループ
	for(let i=0; i<tnlGroup.length; i+=2){// 2個づつ取り出す
		const tnlA = tnlGroup[i];  // 上の土管
		const tnlB = tnlGroup[i+1];// 下の土管
		if(tnlA.x < player.x - width/2){
			// y座標はランダムに
			const y = height/2 + random(-height/5, height/5);
			const padY = 240;
			// 土管の再配置
			tnlA.x = player.x + width;
			tnlA.y = y - padY;
			tnlB.x = player.x + width;
			tnlB.y = y + padY;
		}
	}
	
	// プレイヤー x 土管グループ
	player.collided(tnlGroup, (a, b)=>{
		noLoop();// ゲーム停止(Game Over)
	});

	// スコア
	const score = player.x - width/2;
	if(scoreNum < score) scoreNum = score;
	// スコアラベル
	scoreLabel.x = player.x;
	scoreLabel.text = floor(scoreNum);
}