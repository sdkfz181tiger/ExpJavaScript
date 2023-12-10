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

	const w = width / 24;
	const h = height / 8;
	const deg = 30;
	const pX = w * cos(deg);
	const pY = h * sin(deg);
	const rows = floor(height / h) + 1;
	const cols = floor(width / pX*2);
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * pX * 2 + pX;
			const y = r * h - h / 2;
			drawWing(x, y, w, h, deg);
		}
	}

	blendMode(MULTIPLY);
	fill(150);
	for(let c=0; c<cols/2; c++){
		const x = pX * c * 2 + pX;
		const y = 0;
		rect(x, y, pX, height);
	}
}

function drawWing(x, y, w, h, deg){
	fill(getColor());
	drawRhombus(x, y, w, h, deg);
	//fill(getColor());
	drawRhombus(x, y, w, h, 180-deg);
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