"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	background("silver");

	let pad = 50;// 間隔
	let rows = height / pad;// 縦方向の繰り返し数
	let cols = width / pad; // 横方向の繰り返し数

	// rows回繰り返す処理
	for(let r=0; r<rows; r++){
		// cols回繰り返す処理
		for(let c=0; c<cols; c++){
			let x = c * pad;
			let y = r * pad;

			if((r+c) % 2 == 0){// rが偶数だった場合
				fill("black");// 黒にする
			}else{
				fill("darkgreen");// 緑にする
			}
			square(x, y, pad);

			fill("white");
			text(r+c, x, y+10);
		}
	}
}