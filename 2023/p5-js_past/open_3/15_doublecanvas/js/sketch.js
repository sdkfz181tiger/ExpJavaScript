
let gfxA;// グラフィックス

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noSmooth();
	noLoop();

	// グラフィックスを作ります
	gfxA = createGraphics(100, 100);
	gfxA.background(99);
	gfxA.stroke(200, 100, 100);
	gfxA.strokeWeight(5);
	gfxA.fill(255);
	gfxA.circle(0, 0, 40);
	gfxA.circle(30, 30, 30);
	gfxA.circle(60, 40, 20);
	gfxA.circle(40, 60, 10);
}

function draw(){
	background(33);

	image(gfxA, 0, 0);// グラフィックスを0,0に描画します

	push();
	translate(200, 200);// 基準点を移動
	scale(-1, 1);// x方向に反転, y方向はそのまま
	rotate(30);// 30度回転
	image(gfxA, 0, 0);// グラフィックスを0,0に描画します
	pop();
}