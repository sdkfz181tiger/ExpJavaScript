let cvs;// キャンバス
let player;// プレイヤー
let enemyGroup;// 敵グループ

function setup(){

	// キャンバスの準備
	cvs = new Canvas(480, 320);

	// プレイヤー
	player = new Sprite(width/2, height/2);
	player.width = 30;
	player.height = 30;
	player.color = "orange";
	player.image = "./assets/reimu_good_01.png";// 画像を設定する
	player.debug = true;
	
	// 敵グループ
	enemyGroup = new Group();
	
	// 敵を10個配置
	for(let i=0; i<10; i++){
		// 敵
		let x = random(width);
		let y = random(height);
		let enemy = new enemyGroup.Sprite(x, y);
		enemy.width = 30;
		enemy.height = 30;
		enemy.color = "aqua";
		enemy.image = "./assets/marisa_good_01.png";// 画像を設定する
		enemy.debug = true;
	}
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
	player.collides(enemyGroup, (a, b)=>{
		//noLoop();// ゲーム停止(ゲームオーバー)
	});

	// 画面外判定
	for(let enemy of enemyGroup){
		if(enemy.x < 0) enemy.x = width;
		if(enemy.y < 0) enemy.y = height;
		if(width < enemy.x) enemy.x = 0;
		if(height < enemy.y) enemy.y = 0;
	}
}