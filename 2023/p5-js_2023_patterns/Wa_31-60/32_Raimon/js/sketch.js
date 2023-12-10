"use strict"

const COLORS = ["#FE5D26", "#F2C078", "#FAEDCA", "#C1DBB3", "#7EBC89"];
const WHITE = "#EEEEFF";
const BLACK = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	let len = 4;
	const pX = len * 26;
	const pY = len * 14;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = floor(c * pX);
			let y = floor(r * pY);
			fill(getColor(COLORS));
			drawRaimonL(x, y, len, 0);
			drawRaimonR(x+pX/2, y, len, 0);
		}
	}
}

function drawRaimonL(x, y, len, rot){

	const dirs = [
		{d:0,   t:1}, {d:270, t:1}, {d:180, t:2},
		{d:90,  t:3}, {d:0,   t:4}, {d:270, t:5},
		{d:180, t:6}, {d:90,  t:7}, {d:0,   t:8},
		{d:270, t:9}, {d:180, t:10},{d:90,  t:11},
		{d:0,   t:12},{d:90,  t:1},
		{d:180, t:13},{d:270, t:13},{d:0,   t:12},
		{d:90,  t:11},{d:180, t:10},{d:270, t:9},
		{d:0,   t:8}, {d:90,  t:7}, {d:180, t:6},
		{d:270, t:5}, {d:0,   t:4}, {d:90,  t:3},
		{d:180, t:2}];
	drawShape(x, y, len, rot, dirs);
}

function drawRaimonR(x, y, len, rot){

	const dirs = [
		{d:180, t:1}, {d:270, t:1}, {d:0,   t:2},
		{d:90,  t:3}, {d:180, t:4}, {d:270, t:5},
		{d:0,   t:6}, {d:90,  t:7}, {d:180, t:8},
		{d:270, t:9}, {d:0,   t:10},{d:90,  t:11},
		{d:180, t:12},{d:90,  t:1},
		{d:0,   t:13},{d:270, t:13},{d:180, t:12},
		{d:90,  t:11},{d:0,   t:10},{d:270, t:9},
		{d:180, t:8}, {d:90,  t:7}, {d:0,   t:6},
		{d:270, t:5}, {d:180, t:4}, {d:90,  t:3},
		{d:0,   t:2}];
	drawShape(x, y, len, rot, dirs);
}

function drawShape(x, y, len, rot, dirs){
	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: 0, y: 0};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += len*dir.t * cos(dir.d);
		current.y += len*dir.t * sin(dir.d);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}