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

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function drawFractal(x, y){
	const depth = 5;
	const cmds = createCmds("AA", depth);
	const len = ((width<height)? width:height)/100;
	drawCmds(width/2, 0, cmds, len);
}

function createCmds(str, depth){
	if(depth <= 0) return str;
	let result = "";
	for(let s of str){
		if(s == "A") result += "BABA";
		if(s == "B") result += "BABB";
	}
	return createCmds(result, depth-1);
}

function drawCmds(x, y, cmds, len){
	translate(x, y);
	rotate(90);
	for(let cmd of cmds){
		if(cmd == "A"){
			line(0, 0, len, 0);
			translate(len, 0);
			rotate(90);
			line(0, 0, len, 0);
			translate(len, 0);
			rotate(90);
			continue;
		}
		if(cmd == "B"){
			line(0, 0, len, 0);
			translate(len, 0);
			rotate(-45);
			line(0, 0, len*2, 0);
			translate(len*2, 0);
			rotate(-45);
			continue;
		}
	}
}