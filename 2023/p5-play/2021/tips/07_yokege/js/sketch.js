// 画像素材を格納する変数を用意する
let iReimu, iMarisa;
let vStart, vOver;

// プレイヤーを格納する変数を用意する
let player;
// 敵グループを格納する変数を用意する
let enemyGroup;

function preload(){
	// 画像素材をロードする
	iReimu  = loadImage("./assets/y_reimu.png");
	iMarisa = loadImage("./assets/y_marisa.png");
	// サウンドデータのロード
	vStart  = loadSound("./assets/v_start.mp3");
	vOver   = loadSound("./assets/v_over.mp3");
}

function setup(){
	// キャンバスを用意する
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(24);
	noSmooth();

	vStart.play();// サウンド

	// プレイヤー(霊夢)
	player = createSprite(width/2, height/2);
	player.addImage(iReimu);
	player.scale = 1;
	player.debug = true;

	// 敵グループを用意する(魔理沙)
	enemyGroup = new Group();

	// 定期実行を開始する(1000ミリ秒間隔)
	setInterval(createMarisa, 3000);
}

function draw(){
	background(33);
	drawSprites();
	drawScore();// スコアを表示

	// 敵グループに格納されている敵(魔理沙)全てに処理をする
	for(let enemy of enemyGroup){
		// 敵をキャンバスから出ない様に...(4方向)
		if(enemy.position.x < 0) enemy.position.x = width;
		if(width < enemy.position.x) enemy.position.x = 0;
		if(enemy.position.y < 0) enemy.position.y = height;
		if(height < enemy.position.y) enemy.position.y = 0;
		// プレイヤーの座標が敵の枠内だったら
		if(enemy.overlapPoint(player.position.x, player.position.y)){
			vOver.play();// サウンド
			noLoop();//　ゲーム停止
		}
	}
}

// キーを押した時に実行される関数を用意する
function keyPressed(){
	if(keyCode == 87) player.setSpeed(5, 270);// Wキーを押した時
	if(keyCode == 65) player.setSpeed(5, 180);// Aキーを押した時
	if(keyCode == 83) player.setSpeed(5, 90); // Sキーを押した時
	if(keyCode == 68) player.setSpeed(5, 0);  // Dキーを押した時
}

// キーを離した時に実行される関数を用意する
function keyReleased(){
	player.setSpeed(0, 0);// プレイヤー停止
}

// 敵(魔理沙)をグループに追加する関数
function createMarisa(){
	let enemy = createSprite(0, 0);
	enemy.setSpeed(random(2, 5), random(360));
	enemy.addImage(iMarisa);
	enemy.scale = random(1, 2);
	enemy.debug = true;
	enemyGroup.add(enemy);// グループに追加する
}

// スコアを表示する関数
function drawScore(){
	fill(255);
	textAlign(CENTER, TOP);
	textSize(40);
	text(enemyGroup.length, width/2, 20);
}
