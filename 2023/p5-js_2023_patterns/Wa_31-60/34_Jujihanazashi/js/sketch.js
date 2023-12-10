"use strict"

const COLORS = ["#3D348B", "#7678ED", "#F7B801", "#F18701", "#F35B04"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";
const ORANGE = "#FF6B35";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	noStroke(); strokeCap(PROJECT);

	const len = 12;
	const pad = len*2*(1+2*sin(45)) * 2;
	const rows = floor(height / pad) + 2;
	const cols = floor(width / pad) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * pad;
			const y = r * pad;
			drawJujihana(x, y, len);
		}
	}
}

function drawJujihana(x, y, len){

	fill(getColor(COLORS));
	stroke(WHITE); strokeWeight(len * 0.1);

	const long = len * 2;
	const dirs = [
		{d:0,   l:len}, {d:45,  l:long}, {d:90,  l:len},
		{d:0,   l:len}, {d:45,  l:long}, {d:90,  l:len},
		{d:180, l:len}, {d:225, l:long}, {d:270, l:len},
		{d:180, l:len}, {d:225, l:long}];
	fill(getColor(COLORS));
	drawShape(x, y, 0, -len*2*(1+2*sin(45)), len, 0,   dirs);
	fill(getColor(COLORS));
	drawShape(x, y, 0, -len*2*(1+2*sin(45)), len, 90,  dirs);
	fill(getColor(COLORS));
	drawShape(x, y, 0, -len*2*(1+2*sin(45)), len, 180, dirs);
	fill(getColor(COLORS));
	drawShape(x, y, 0, -len*2*(1+2*sin(45)), len, 270, dirs);

	stroke(ORANGE); strokeWeight(len * 0.3);
	line(x-len*0.8, y, x+len*0.8, y);
	line(x, y-len*0.8, x, y+len*0.8);
}

function drawShape(x, y, cX, cY, len, rot, dirs){

	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: cX, y: cY};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += dir.l * cos(dir.d);
		current.y += dir.l * sin(dir.d);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}