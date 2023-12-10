
let counter = 0;// 連打カウンター
let time = 16 * 10;// 残り時間

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(16);// 1秒間に16フレームでループ
	textAlign(CENTER, CENTER);
	fill(255);
}

function draw() {
	background(33);

	// 連打カウンターの計算
	time--;
	if(0 <= time){
		drawMessage("連打してください!!");
	}else{
		drawMessage("連打速度は" + (counter/10) + "回/秒です!!");
		noLoop();// ループを停止
	}

	// 連打カウンターの表示
	textSize(256);
	text(counter, width/2, height*0.5);
	
	// 残り時間
	textSize(32);
	text(floor(time/16)+1, width/2, height*0.2);
}

function mousePressed(){
	// 連打カウンターに+1
	counter++;
}

function drawMessage(msg){
	// 結果を表示
	const result = "連打速度は" + (counter/10) + "回/秒です!!";
	textSize(24);
	text(msg, width/2, height*0.8);
}