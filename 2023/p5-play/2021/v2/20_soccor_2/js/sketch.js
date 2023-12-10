
const DIR = "./assets/";

let imgA, imgB;

let tanukiGroup;// 1-1, タヌキグループ
let ballGroup;  // 1-2, ボールグループ

function preload(){
	imgA = loadImage(DIR + "i_tanu.png");
	imgB = loadImage(DIR + "i_ball.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	frameRate(32);
	background(33);

	tanukiGroup = new Group();// 2-1, タヌキグループを作る

	// 2-2, 10個のスプライトをタヌキグループに追加
	for(let i=0; i<10; i++){
		// タヌキ
		let tanu = createSprite(random(width), random(height));
		tanu.addImage(imgA);
		tanu.debug = true;
		tanu.scale = 4;
		tanu.setSpeed(random(5, 8), random(360));
		tanukiGroup.add(tanu);// 2-3, タヌキグループに追加
	}

	ballGroup = new Group();// 2-1, ボールグループを作る

	// 2-2, 3個のスプライトをボールグループに追加
	for(let i=0; i<3; i++){
		// ボール
		let ball = createSprite(random(width), random(height));
		ball.addImage(imgB);
		ball.debug = true;
		ball.scale = 2;
		ballGroup.add(ball);// 2-3, ボールグループに追加
	}
}

function draw(){
	background(33);
	drawSprites();

	tanukiGroup.bounce(ballGroup);// 4, タヌキグループ x ボールグループ

	// 5, 全部のスプライトを画面から出ない様にする処理
	for(let spr of allSprites){
		if(spr.position.x < 0) spr.position.x = width;
		if(width < spr.position.x) spr.position.x = 0;
		if(spr.position.y < 0) spr.position.y = height;
		if(height < spr.position.y) spr.position.y = 0;
	}
}