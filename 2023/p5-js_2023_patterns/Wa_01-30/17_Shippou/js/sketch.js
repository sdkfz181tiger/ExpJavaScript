"use strict"

const COLORS = ["#05668D", "#427AA1", "#679436", "#A5BE00"];
const COLOR_A = "#EBF2FA";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(COLOR_A);
	const len  = 120;
	const rows = floor(height / len) + 2;
	const cols = floor(width / len) + 2;
	for(let c=0; c<cols; c++){
		for(let r=0; r<rows; r++){
			const x = c * len;
			const y = r * len;
			drawRing(x, y, len);
		}
	}
}

function drawRing(x, y, len){
	noFill();
	noStroke();

	push();
	translate(x, y);
	drawLeaf(0, len/2);
	drawLeaf(90, len/2);
	drawLeaf(180, len/2);
	drawLeaf(270, len/2);
	pop();
}

function drawLeaf(r, len){
	fill(getColor());
	noStroke();

	rotate(r);
	beginShape();
	for(let i=0; i<90; i+=2){
		const x = len * cos(i);
		const y = len * sin(i);
		vertex(x, y);
	}
	for(let i=180; i<270; i+=2){
		const x = len * cos(i) + len;
		const y = len * sin(i) + len;
		vertex(x, y);
	}
	endShape();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}