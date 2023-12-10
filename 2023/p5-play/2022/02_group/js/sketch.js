let marisaGroup;// グループ
let reimu;// スプライト

function preload(){

	// アニメーション
	loadAni("r_good", "./assets/reimu_good_01.png", 3);
	loadAni("m_good", "./assets/marisa_good_01.png", 3);

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
	//reimu.speed = 6;// 速度
	//reimu.direction = 0;// 角度

	// スプライト(魔理沙)
	for(let i=0; i<5; i++){
		const x = random(width);
		const y = random(height);
		let marisa = new marisaGroup.Sprite(x, y, 45);
		marisa.shapeColor = color("white");
		marisa.ani = "m_good";
		marisa.scale = 2;
	}

	// スプライト同士の衝突
	// marisaGroup.collide(reimu, (a, b)=>{
	// 	a.remove();// スプライトを消す
	// });
}

function draw(){
	background(33);

	// マウス座標に追随する
	reimu.moveTowards(mouse.x, mouse.y, 0.2);

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