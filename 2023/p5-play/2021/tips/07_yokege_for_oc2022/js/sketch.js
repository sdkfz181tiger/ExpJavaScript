let iReimu, iMarisa, iBkg;
let vReimu, vMarisa, vStart, vOver;
let player, enemyGroup;

function preload(){
	iReimu  = loadImage("./assets/y_reimu.png");
	iMarisa = loadImage("./assets/y_marisa.png");
	iBkg    = loadImage("./assets/y_bkg.png");
	vReimu  = loadSound("./assets/v_reimu.mp3");
	vMarisa = loadSound("./assets/v_marisa.mp3");
	vStart  = loadSound("./assets/v_start.mp3");
	vOver   = loadSound("./assets/v_over.mp3");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(24);
	noSmooth();

	createBkg();
	createReimu(width/2, height/2);// 霊夢
	createMarisa(3000);// 魔理沙
}

function draw(){
	background(33);
	drawSprites();
	drawScore();

	if(!enemyGroup) return;
	for(let enemy of enemyGroup){
		if(enemy.position.x < 0) enemy.position.x = width;
		if(width < enemy.position.x) enemy.position.x = 0;
		if(enemy.position.y < 0) enemy.position.y = height;
		if(height < enemy.position.y) enemy.position.y = 0;
		if(enemy.overlapPoint(player.position.x, player.position.y)){
			vOver.play();// サウンド
			noLoop();
		}
	}
}

function keyPressed(){
	console.log(keyCode);
	if(keyCode == 87) player.setSpeed(5, 270);// Wキーを押した時
	if(keyCode == 65) player.setSpeed(5, 180);// Aキーを押した時
	if(keyCode == 83) player.setSpeed(5, 90); // Sキーを押した時
	if(keyCode == 68) player.setSpeed(5, 0);  // Dキーを押した時
}

function keyReleased(){
	player.setSpeed(0, 0);// プレイヤー停止
}

function createBkg(){
	const bkg = createSprite(width/2, height/2);
	bkg.addImage(iBkg);
	bkg.scale = width / bkg.width;
}

function createReimu(x, y){
	vReimu.play();// サウンド
	player = createSprite(x, y);
	player.addImage(iReimu);
	player.scale = 1;
	player.debug = true;
}

function createMarisa(mil){

	if(!enemyGroup){
		enemyGroup = new Group();
	}else{
		vMarisa.play();// サウンド
		const enemy = createSprite(0, 0);
		enemy.setSpeed(random(2, 5), random(360));
		enemy.addImage(iMarisa);
		enemy.scale = random(1, 2);
		enemy.debug = true;
		enemyGroup.add(enemy);
	}

	if(!isLooping()) return;
	setTimeout(()=>{
		createMarisa(mil)
	}, mil)
}

function drawScore(){
	if(!enemyGroup) return;
	fill(255);
	textAlign(CENTER, TOP);
	textSize(40);
	text(enemyGroup.length, width/2, 20);
}
