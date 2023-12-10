"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("lightblue");

	//==========
	// 縦縞

	fill("white");
	noStroke();

	// 5回繰り返す処理(外側)
	// for(let r=0; r<5; r++){
	// 	// 5回繰り返す処理(内側)
	// 	for(let c=0; c<5; c++){
	// 		let x = c * 50;
	// 		let y = r * 50;
	// 		circle(x, y, 25);
	// 	}
	// }

	let pad = 50;// 水玉の間隔
	let d   = 25;// 水玉の大きさ

	let rows = height / pad;// 縦に何回繰り返すか
	let cols = width / pad; // 横に何回繰り返すか

	// 5回繰り返す処理(外側)
	for(let r=0; r<rows; r++){
		// 5回繰り返す処理(内側)
		for(let c=0; c<cols; c++){
			let x = c * pad;
			let y = r * pad;
			circle(x, y, d);
		}
	}
}