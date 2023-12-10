"use strict"

const COLORS = ["#780000", "#C1121F", "#FDF0d5", "#003049", "#669BBC"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(220);

	const len = 60;
	const rows = floor(height / len) + 2;
	const cols = floor(width / len) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = len * c;
			let y = len * r;
			const n = floor(random(2, 12));
			if(r%2==0) x += len / 2;
			drawRose(x, y, len*0.4, n);
		}
	}
}

function drawRose(x, y, len, n){
	const c = getColor();
	fill(c);
	stroke(c); strokeWeight(len*0.05);

	push();
	translate(x, y);
	rotate(random(360));
	beginShape();
	for(let t=0; t<360; t++){
		const pX = len * sin(n*t) * cos(t);
		const pY = len * sin(n*t) * sin(t);
		vertex(pX, pY);
	}
	endShape();
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}