// 画像素材
let imgGround, imgMan01, imgMan02;
let imgTrunk, imgBranch;

let sprGroup;// 障害物グループ
let sprPlayer;// プレイヤー

let score;
let barW;

function preload(){
	imgGround = loadImage("./assets/tm_ground.png");
	imgMan01  = loadImage("./assets/tm_man_01.png");
	imgMan02  = loadImage("./assets/tm_man_02.png");
	imgTrunk  = loadImage("./assets/tm_trunk.png");
	imgBranch = loadImage("./assets/tm_branch.png");
}

function setup(){
	createCanvas(320, 240);
	angleMode(DEGREES);
	frameRate(24);
	noSmooth();

	// 地面
	let ground = createSprite(width/2, height-32);
	ground.addImage(imgGround);
	ground.scale = 2;

	sprGroup = new Group();// 障害物グループ

	for(let i=0; i<5; i++){// 5回繰り返す
		let x = width/2;
		let y = 160 - i * 36;
		createTrunk(x, y);// 幹を1つ追加
	}

	// プレイヤー
	player = createSprite(width/2-50, height-80);
	player.addImage(imgMan01);
	player.scale = 2;
	player.debug = true;

	// スコア
	score = 0;
	// バーの長さ
	barW = width;
}

function draw(){
	background(100, 150, 250);
	drawSprites();

	noStroke();

	// スコアを表示
	fill(255);
	textAlign(CENTER);
	textSize(40);
	text(score, width/2, height-18);

	// バーを表示
	fill(250, 150, 100);
	rect(width/2-barW/2, 230, barW, 5);

	//  バーの長さ
	barW -= width / (24 * 10);
	if(barW < 0){
		barW = 0;
		noLoop();
	}
}

function mousePressed(){

	player.addImage(imgMan02);// 画像切り替え
	setTimeout(()=>{
		player.addImage(imgMan01);// 画像切り替え
	}, 200);

	// マウスの位置を判定
	if(mouseX < width/2){
		player.position.x = width / 2 - 50;
		player.mirrorX(1);
	}else{
		player.position.x = width / 2 + 50;
		player.mirrorX(-1);
	}
	
	// 全ての障害物を下にずらす
	for(let i=sprGroup.length-1; 0<=i; i--){
		let spr = sprGroup[i];
		spr.position.y += 36;
		if(160 < spr.position.y){// 160を越えていたら削除
			spr.remove();
		}
	}

	// 幹を一つ配置
	let last = sprGroup[sprGroup.length-1];// 配列の最後
	createTrunk(width/2, last.position.y-36);// その上に幹を配置
	
	// 3割の確率で枝を配置
	if(random(10) < 3){
		let last = sprGroup[sprGroup.length-1];// 配列の最後
		if(random(10) < 5){
			createBranch(last.position.x - 48, last.position.y, 1);
		}else{
			createBranch(last.position.x + 48, last.position.y, -1);
		}
	}
	
	// 障害物 x プレイヤー
	sprGroup.overlap(player, (e)=>{
		if(e.tag == "branch"){// タグが"枝"だったら
			noLoop();// ゲームオーバー
		}
	});

	score++;// スコア加算
}

function createTrunk(x, y){
	// 幹を一つ配置
	let spr = createSprite(x, y);
	spr.addImage(imgTrunk);
	spr.scale = 2;
	spr.debug = true;
	spr.tag = "trunk";// タグをつける(幹)
	sprGroup.add(spr);// グループに追加
}

function createBranch(x, y, m){
	// 枝を一つ配置
	let spr = createSprite(x, y);
	spr.addImage(imgBranch);
	spr.scale = 2;
	spr.debug = true;
	spr.tag = "branch";// タグをつける(枝)
	spr.mirrorX(m);// 左右反転(-1/1)
	sprGroup.add(spr);// グループに追加
}
