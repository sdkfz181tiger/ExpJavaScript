"use strict"

const COLORS = ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"];
const WHITE = "#EEEEFF";
const BLACK = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	noStroke();

	let len = 8;
	const pX = len * 7;
	const pY = len * 7;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = floor(c * pX);
			const y = floor(r * pY);
			drawManji(x, y, len);
		}
	}
}

function drawManji(x, y, len){

	noStroke();

	const dirs = [
		0, 0, 0, 90, 90, 90, 90, 0, 0, 90, 180, 180, 180,
		270, 270, 270, 270, 180, 180];
	fill(getColor(COLORS));
	drawShape(x, y, len, 0, dirs);
	fill(getColor(COLORS));
	drawShape(x, y, len, 90, dirs);
}

function drawShape(x, y, len, rot, dirs){
	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: -len*2.5, y: -len*2.5};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += len * cos(dir);
		current.y += len * sin(dir);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}