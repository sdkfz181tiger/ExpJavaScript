let reimu, marisa;// スプライト

function preload(){

	// アニメーション
	loadAni("r_good", "./assets/reimu_good_01.png", 3);
	loadAni("r_bad", "./assets/reimu_bad_01.png", 3);
	loadAni("m_good", "./assets/marisa_good_01.png", 3);
	loadAni("m_bad", "./assets/marisa_bad_01.png", 3);
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noSmooth();
	noStroke();

	// スプライト(霊夢)
	reimu = new Sprite(width/2-100, height/2, 45, "dynamic");
	reimu.shapeColor = color("white");
	reimu.ani = "r_good";
	reimu.scale = 1;
	reimu.speed = 6;// 速度
	reimu.direction = 0;// 角度

	// スプライト(魔理沙)
	marisa = new Sprite(width/2+100, height/2, 45, "static");
	marisa.shapeColor = color("white");
	marisa.ani = "m_good";
	marisa.scale = 1;

	// スプライト同士の衝突(跳ね返り)
	// reimu.collide(marisa, (a, b)=>{
	// 	a.ani = "r_bad";// アニメーションの変更
	// 	b.ani = "m_bad";
	// });

	// スプライト同士の交差(すり抜け)
	// reimu.overlap(marisa, (a, b)=>{
	// 	a.ani = "r_bad";// アニメーションの変更
	// 	b.ani = "m_bad";
	// });
}

function draw(){
	background(33);

	// 全てのスプライトを調べる
	for(let sprite of allSprites){
		// キャンバスの外に出たら反対側へ移動させる(4方向)
		if(width < sprite.x) sprite.x = 0; // 右から出たら
		if(sprite.x < 0) sprite.x = width; // 左から出たら
		if(height < sprite.y) sprite.y = 0;// 下から出たら
		if(sprite.y < 0) sprite.y = height;// 上から出たら
	}

	// 衝突判定
	if(reimu.collide(marisa)){
		console.log("Hit!!");
	}

	// Debug
	allSprites.debug = mouse.pressing();
}