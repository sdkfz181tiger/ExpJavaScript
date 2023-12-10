"use strict"

const COLORS = ["#2F6690", "#3A7CA5", "#D9DCD6", "#16425B", "#81C3D7"];
const WHITE  = "#FFFFFF";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); strokeCap(PROJECT);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(WHITE);

	const len = 30;
	const pX  = len * 4;
	const pY  = len * 4;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let c=0; c<cols; c++){
		for(let r=0; r<rows; r++){
			let x = c * pX;
			let y = r * pY;
			drawKado(x, y, len);
		}
	}
}

function drawKado(x, y, len){
	drawUnit(x-len, y-len, len, 0);
	drawUnit(x+len, y-len, len, 90);
	drawUnit(x+len, y+len, len, 180);
	drawUnit(x-len, y+len, len, 270);
}

function drawUnit(x, y, len, deg){

	const pA = {x: -len/2, y: -len/2}
	const pB = {x: len/2, y: len/2}
	const weight = len * 0.4;
	const pad = len * 0.1;

	push();
	translate(x, y);
	rotate(deg);

	noFill();
	stroke(getColor());

	strokeWeight(weight);
	line(pA.x, pA.y, pA.x+len*2-weight-pad, pA.y);
	line(pA.x, pA.y, pA.x, pB.y-weight-pad);
	line(pB.x, pB.y, pB.x-len*2+weight+pad, pB.y);
	line(pB.x, pB.y, pB.x, pA.y+weight+pad);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}