"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("orange");

	fill("white");
	noStroke();

	let pad = 50;// 間隔
	let rows = height / pad;// 縦方向の繰り返し数
	let cols = width / pad; // 横方向の繰り返し数

	// rows回繰り返す処理
	for(let r=0; r<rows; r++){
		// cols回繰り返す処理
		for(let c=0; c<cols; c++){
			let x = c * pad;
			let y = r * pad;
			//circle(x, y, pad/2);
			drawTriangle(x, y, pad/4);
		}
	}
}

function drawTriangle(x, y, r){
	angleMode(DEGREES);
	let pts = [];
	for(let i=0; i<3; i++){
		let d = i * 120 + 30;
		let pX = x + r * cos(d);
		let pY = y + r * sin(d);
		pts.push({x:pX, y:pY});
	}
	triangle(pts[0].x, pts[0].y, pts[1].x, pts[1].y, pts[2].x, pts[2].y);
}