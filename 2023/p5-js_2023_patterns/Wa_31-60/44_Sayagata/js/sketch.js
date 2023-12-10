"use strict"

const COLORS = ["#FF6700", "#EBEBEB", "#C0C0C0", "#3A6EA5", "#004E98"];
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
	drawSayaUnit(width/2, height/2, len, 30);
}

function drawSayaUnit(x, y, len, rot=0){

	const pX = len * 20;
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
			if(r%2==0) x -= pX / 2;
			fill(getColor(COLORS));
			drawSaya(x, y, len, 0);
			drawSaya(x+pX/2, y, len, 90);
		}
	}
	pop();
}

function drawSaya(x, y, len, rot=0){

	const dirs = [
		{d:0,   l:len*13}, {d:90,  l:len},
		{d:180, l:len*2},  {d:90,  l:len*2},
		{d:180, l:len},    {d:270, l:len*2},
		{d:180, l:len*3},  {d:90,  l:len*15},
		{d:0,   l:len*3},  {d:270, l:len*2},
		{d:0,   l:len},    {d:90,  l:len*2},
		{d:0,   l:len*2},  {d:90,  l:len},
		{d:180, l:len*13}, {d:270, l:len},
		{d:0,   l:len*2},  {d:270, l:len*2},
		{d:0,   l:len},    {d:90,  l:len*2},
		{d:0,   l:len*3},  {d:270, l:len*15},
		{d:180, l:len*3},  {d:90,  l:len*2},
		{d:180, l:len},    {d:270, l:len*2},
		{d:180, l:len*2}];
	const cX = (-len*13) / 2;
	const cY = (-len*17) / 2;
	drawShape(x, y, cX, cY, len, rot, dirs);
	//circle(x, y, 5);
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