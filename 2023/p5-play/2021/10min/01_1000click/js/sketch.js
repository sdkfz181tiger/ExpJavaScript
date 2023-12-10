
let counter = 0;// カウンター

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
}

function draw() {
	background(33);

	textAlign(CENTER, CENTER);
	fill(255);

	textSize(64);
	text("1000回クリックすると卵が割れます", width/2, height/4);

	// 連打カウンター
	textSize(256);
	text(counter, width/2, height/2);
}

function mousePressed(){
	counter++;
}