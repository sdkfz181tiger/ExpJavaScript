
let counter = 0;// 連打カウンター
let time = 16 * 10;// 残り時間

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
}

function draw() {
	background(33);

	textAlign(CENTER, CENTER);
	fill(255);

	// 連打カウンターの計算
	time--;
	if(time < 0){
		noLoop();// ループを停止
		drawResult();// 結果を表示
	}

	// 連打カウンターの表示
	textSize(256);
	text(counter, width/2, height/2);
	
	// 残り時間
	textSize(48);
	text(floor(time/16)+1, width/2, height*0.2);
}

function mousePressed(){
	// 連打カウンターに+1
	counter++;
}

function drawResult(){
	// 結果を表示
	const result = "連打速度は" + (counter/10) + "回/秒です!!";
	textSize(24);
	text(result, width/2, height*0.8);
}