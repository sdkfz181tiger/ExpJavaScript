
function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(24);
	noLoop();
	noSmooth();

	// ポイント1
	createBkg();

	// ポイント2
	createReimu(width/2, height/2);
}

function draw(){
	background(33);
	drawSprites();
	drawScore();

	if(!player) return;

	// ポイント5-1
	if(player.position.x < 0) player.position.x = 0;
	if(width < player.position.x) player.position.x = width;

	// ポイント5-2
	if(player.position.y < 0) player.position.y = 0;
	if(height < player.position.y) player.position.y = height;

	if(!enemyGroup) return;
	for(let enemy of enemyGroup){
		outside(enemy);// Outside
		if(enemy.overlapPoint(player.position.x, player.position.y)){
			noLoop();// Stop
			vOver.play();// Sound
		}
	}
}

function mousePressed(){
	if(gameFlg) return;
	gameFlg = true;
	// GameStart!!
	loop();// Loop
	vStart.play();// Sound
	// ポイント4
	createMarisa(3000);
}

function keyPressed(){
	if(!gameFlg || !player) return;

	// ポイント3-1
	if(keyCode == 68) player.setSpeed(5, 0);  // Dキーを押した時
	if(keyCode == 83) player.setSpeed(5, 90); // Sキーを押した時
	if(keyCode == 65) player.setSpeed(5, 180);// Aキーを押した時
	if(keyCode == 87) player.setSpeed(5, 270);// Wキーを押した時
}

function keyReleased(){
	if(!gameFlg || !player) return;

	// ポイント3-2
	player.setSpeed(0, 0);// プレイヤー停止
}

function createMarisa(mil){
	if(!gameFlg || !isLooping()) return;

	if(!enemyGroup){
		enemyGroup = new Group();
	}else{
		const rdm = floor(random() * iMarisas.length);
		const enemy = createSprite(0, 0);
		enemy.addImage(iMarisas[rdm]);
		enemy.setSpeed(random(2, 5), random(360));// ポイント6-1
		enemy.scale = random(1, 3);// ポイント6-2
		enemy.debug = true;
		enemyGroup.add(enemy);
		vMarisa.play();// Sound
	}

	setTimeout(()=>{createMarisa(mil);}, mil)
}