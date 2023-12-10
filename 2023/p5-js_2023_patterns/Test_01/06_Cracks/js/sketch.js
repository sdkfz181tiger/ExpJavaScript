"use strict"

const COLORS = ["#780000", "#C1121F", "#FDF0d5", "#003049", "#669BBC"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(222);
	noStroke();

	const w    = 30;
	const h    = w * 2;
	const deg  = floor(random(20, 45));
	const pX   = w * cos(deg);
	const pY   = h * sin(deg);
	const cols = floor(width/pX) + 1;
	const rows = floor(height/h) + floor(pY*cols/h) + 1;
	const sX   = 0;
	const sY   = - pY * cols;
	drawWing(sX, sY, w, h, deg, pX, pY, rows, cols);
}

function drawWing(sX, sY, w, h, deg, pX, pY, rows, cols){
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const color = COLORS[(r+c)%COLORS.length];
			fill(color);
			const x = sX + c * pX;
			const y = sY + r * h + c * pY;
			drawRhombus(x, y, w, h, deg);
		}
	}
}

function drawRhombus(x, y, w, h, deg){
	const oX = w*cos(deg);
	const oY = h*sin(deg);
	push();
	translate(x, y);
	beginShape();
	vertex(0, 0);
	vertex(oX, oY);
	vertex(oX, oY+h);
	vertex(0, h);
	endShape();
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}