"use strict"

const BLACK = "#333333";
const WHITE = "#FFFFFF";
const BLUE  = "#336699";

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

	const len = 4;
	drawYoshihara(len);
}

function drawYoshihara(len){

	push();
	rotate(10);
	const pX = len * 24;
	const pY = (len*8) * cos(45) * 2 + len * cos(45);
	const rows = floor(height / pY) * 2;
	const cols = floor(width / pX) * 2;
	const sX = -width / 2;
	const sY = -height / 2;

	for(let c=0; c<cols; c++){
		const x = sX + c * pX;
		if(c%2==0){
			fill(BLUE);
		}else{
			fill(WHITE);
		}
		rect(x, height/2, pX, height*2);
		if(c%2==0){
			fill(WHITE);
		}else{
			fill(BLUE);
		}
		for(let r=0; r<rows; r++){
			const y = sY + r * pY;
			drawUnit(x, y, len);
		}
	}
	pop();
}

function drawUnit(x, y, len){

	const dirs = [
		225, 135, 225, 225, 315, 315, 315, 45, 315, 
		45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 135, 45, 
		135, 135, 135, 135, 135, 135, 135, 225, 225,
		315, 315, 315, 315, 315, 225, 315,
		225, 225, 225, 225, 225, 225, 225, 225, 225];
	drawShape(x, y, len, 0, dirs);
	drawShape(x, y+len*cos(45), len, 180, dirs);
}

function drawShape(x, y, len, rot, dirs){
	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: 0, y: 0};
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