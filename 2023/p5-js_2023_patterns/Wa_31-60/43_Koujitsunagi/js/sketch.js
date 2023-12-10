"use strict"

const COLORS = ["#CC5803", "#E2711D", "#FF9505", "#FFB627", "#FFC971"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

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

	const len = 8;
	drawKoujiUnit(width/2, height/2, len, 30);
}

function drawKoujiUnit(x, y, len, rot=0){

	const pX = len * 6;
	const pY = len * 10;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;

	push();
	translate(x, y);
	rotate(rot);
	for(let r=-rows; r<rows; r++){
		for(let c=-cols; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(c%2==0) y -= pY / 2;
			fill(getColor(COLORS));
			drawKouji(x, y, len);
		}
	}
	pop();
}

function drawKouji(x, y, len, rot=0){

	const dirs = [
		{d:0,   l:len*9}, {d:90,  l:len*2},
		{d:180, l:len},   {d:270, l:len},
		{d:180, l:len*3}, {d:90,  l:len*7},
		{d:0,   l:len*3}, {d:270, l:len},
		{d:0,   l:len},   {d:90,  l:len*2},
		{d:180, l:len*9}, {d:270, l:len*2},
		{d:0,   l:len*1}, {d:90,  l:len},
		{d:0,   l:len*3}, {d:270, l:len*7},
		{d:180, l:len*3}, {d:90,  l:len},
		{d:180, l:len}];
	const cX = (-len*9) / 2;
	const cY = (-len*9) / 2;
	drawShape(x, y, cX, cY, len, rot, dirs);
	circle(x, y, 5);
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