let marisaGroup;// グループ
let reimu;// スプライト

function preload(){

	// アニメーション
	loadAni("r_good", "./assets/reimu_good_01.png", 3);
	loadAni("r_oh", "./assets/reimu_oh_01.png", 3);
	loadAni("m_good", "./assets/marisa_good_01.png", 3);
	loadAni("m_oh", "./assets/marisa_oh_01.png", 3);

	// グループ
	marisaGroup = new Group();
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noSmooth();
	noStroke();

	// スプライト(霊夢)
	reimu = new Sprite(width/2, height/2, 45);
	reimu.shapeColor = color("white");
	reimu.ani = "r_good";
	reimu.scale = 2;

	// スプライト(魔理沙)
	setInterval(createMarisa, 1000);

	// スプライト同士の衝突
	reimu.collide(marisaGroup, (a, b)=>{
		a.ani = "r_oh";// アニメーション変更
		b.ani = "m_oh";
		setTimeout(()=>{// 500ミリ秒後に停止
			noLoop();
		}, 500);
	});
}

function draw(){
	background(33);

	showScore();// スコア表示

	// コントロール(WASD)
	if(kb.pressing("w")) reimu.y -= 8;
	if(kb.pressing("a")) reimu.x -= 8;
	if(kb.pressing("s")) reimu.y += 8;
	if(kb.pressing("d")) reimu.x += 8;

	// 全てのスプライトを調べる
	for(let sprite of allSprites){
		// キャンバスの外に出たら反対側へ移動させる(4方向)
		if(width < sprite.x) sprite.x = 0; // 右から出たら
		if(sprite.x < 0) sprite.x = width; // 左から出たら
		if(height < sprite.y) sprite.y = 0;// 下から出たら
		if(sprite.y < 0) sprite.y = height;// 上から出たら
	}

	// Debug
	allSprites.debug = mouse.pressing();
}

function showScore(){
	fill(255);
	textAlign(CENTER, TOP);
	textSize(40);
	text(marisaGroup.length, width/2, 20);
}

function createMarisa(){
	let marisa = new marisaGroup.Sprite(0, 0, 45);
	marisa.shapeColor = color("white");
	marisa.ani = "m_good";
	marisa.scale = 2;
	marisa.speed = random(2, 4);
	marisa.direction = random(360);
}