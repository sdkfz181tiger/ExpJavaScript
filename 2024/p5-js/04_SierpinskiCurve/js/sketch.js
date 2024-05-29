"use strict"

const WHITE = "#eeeeee";
const BLACK = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop(); stroke(WHITE); strokeWeight(2);
}

function draw(){
	background(BLACK);
	drawFractal();
}

function drawFractal(x, y){
	const depth = 5;// 再帰処理をする回数
	const cmds = createCmds("AA", depth);// 再帰処理の開始
	const len = ((width<height)? width:height)/100;
	drawCmds(width/2, 0, cmds, len);// コマンドを元に図形を描画
}

function createCmds(str, depth){
	if(depth <= 0) return str;
	let result = "";
	for(let s of str){
		if(s == "A") result += "BABA";// Aを置き換える
		if(s == "B") result += "BABB";// Bを置き換える
	}
	return createCmds(result, depth-1);// 再帰処理
}

function drawCmds(x, y, cmds, len){
	push();
	translate(x, y);
	rotate(90);
	for(let cmd of cmds){
		if(cmd == "A"){// "A"の描画命令
			line(0, 0, len, 0);
			translate(len, 0);
			rotate(90);
			line(0, 0, len, 0);
			translate(len, 0);
			rotate(90);
			continue;
		}
		if(cmd == "B"){// "B"の描画命令
			line(0, 0, len, 0);
			translate(len, 0);
			rotate(-45);
			line(0, 0, len*2, 0);
			translate(len*2, 0);
			rotate(-45);
			continue;
		}
	}
	pop();
}