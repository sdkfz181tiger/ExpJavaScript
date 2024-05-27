"use strict"

const COLORS = ["#3a7ca5", "#d9dcd6", "#16425b", "#81c3d7"];
const WHITE  = "#eeeeee";
const BLACK  = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); imageMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	frameRate(32); noLoop();
}

function draw(){
	background(BLACK);
	noFill(); noStroke();

	stroke(255); strokeWeight(1);
	drawFractal();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function drawFractal(x, y){
	stroke(WHITE); noFill();
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