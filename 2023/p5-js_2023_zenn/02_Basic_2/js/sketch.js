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

	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let dia = i * 50;// 半径(0,50,100,150,200)
		circle(0, 0, dia);
	}

	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let dia = i * 50;// 半径(0,50,100,150,200)
		circle(200, 200, dia);
	}

	// 5回繰り返す処理(0,1,2,3,4)
	for(let i=0; i<5; i++){
		let dia = i * 50;// 半径(0,50,100,150,200)
		circle(width/2, height/2, dia);
	}
}