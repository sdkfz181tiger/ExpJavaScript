"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("silver");

	//==========
	// 横縞

	fill("red");
	// 5回繰り返す処理
	for(let i=0; i<5; i++){
		let x = 0;
		let y = 100 * i;
		rect(x, y, width, 50);
	}

	//==========
	// 縦縞

	fill("blue");
	// 5回繰り返す処理
	for(let i=0; i<5; i++){
		let x = 100 * i;
		let y = 0;
		rect(x, y, 50, height);
	}
}