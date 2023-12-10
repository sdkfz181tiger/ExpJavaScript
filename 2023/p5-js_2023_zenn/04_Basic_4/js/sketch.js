"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("silver");

	noFill();// 塗りなし
	stroke("white");// 線の色
	strokeWeight(5);// 線の太さ

	//==========
	// ランダム

	// 100回繰り返す処理
	for(let i=0; i<100; i++){
		let x = random(width); // 0 ~ width未満の乱数
		let y = random(height);// 0 ~ height未満の乱数
		let d = random(10, 50);// 10 ~ 50未満の乱数
		let r = random(255);
		let g = random(255);
		let b = random(255);
		//stroke(r, g, b);
		square(x, y, d);
	}
}