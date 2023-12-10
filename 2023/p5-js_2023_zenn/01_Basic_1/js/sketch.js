"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("silver");

	// x座標, y座標, 直径
	circle(100, 100, 50);

	// fillでRainbow
	fill("red");
	circle(100, 200, 50);
	fill("pink");
	circle(200, 200, 50);
	fill("yellow");
	circle(300, 200, 50);
	fill("green");
	circle(400, 200, 50);
	fill("blue");
	circle(500, 200, 50);
	fill("purple");
	circle(600, 200, 50);
	fill("orange");
	circle(700, 200, 50);

	// width: キャンバスの横幅
	// height: キャンバスの高さ
	fill("white");
	circle(0, 0, 50);// 左上
	circle(width, 0, 50);// 右上
	circle(0, height, 50);// 左下
	circle(width, height, 50);// 右下
	circle(width/2, height/2, 50);// 中央
}