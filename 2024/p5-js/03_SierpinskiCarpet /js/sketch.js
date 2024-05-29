"use strict"

const WHITE = "#eeeeee";
const BLACK = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop(); noFill(); noStroke();
}

function draw(){
	background(BLACK);

	// 四角形の辺の長さと座標
	const len = (width<height)?width*0.8:height*0.8;
	const x = width/2 - len/2;
	const y = height/2 - len/2;
	fill(WHITE);
	square(x, y, len);// 最初の四角形を描く
	fill(BLACK);
	drawFractal(x, y, len, 3);// 再帰処理の開始
}

function drawFractal(x, y, len, depth){

	// 四角形の辺を3等分する
	const pad = len / 3;
	// 9x9の四角形の座標を求める
	for(let r=0; r<3; r++){
		for(let c=0; c<3; c++){
			// 分割された四角形の座標
			const cX = x + pad*c;
			const cY = y + pad*r;
			// 中央の四角形であれば四角形を描画
			if(r==1 && c==1){
				square(cX, cY, pad);
				continue;
			}
			if(depth <= 0) continue;// これ以上再帰をしない
			// その他の8つの四角形に対して再帰
			drawFractal(cX, cY, pad, depth-1);
		}
	}
}