"use strict"

const BLUE  = "#224488";
const WHITE = "#FFFFFF";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLUE);

	const pX = 40;
	const weight = pX * 0.14;
	drawTatewaku(pX, weight);
}

function drawTatewaku(pX, weight){

	const cX = width / 2;
	const cY = height / 2;
	const sX = -cX;
	const sY = -cY;

	push();
	translate(cX, cY);
	rotate(0);

	noFill();
	stroke(WHITE); strokeWeight(weight);

	const cols = floor(width / pX) + 2;
	for(let c=0; c<cols; c++){
		drawVertical(sX, sY, c, pX, 0);
		drawVertical(sX, sY, c, pX, weight + 2);
	}
	pop();
}

function drawVertical(sX, sY, c, pX, oX){

	beginShape();
	const rad  = pX * 0.3;
	const rows = height;
	for(let r=0; r<rows; r+=3){
		let x = sX + c * pX + oX;
		let y = sY + r;
		const d = r * 2.5;
		if(c%2==0){
			x += rad*sin(d);
		}else{
			x -= rad*sin(d);
		}
		vertex(x, y);
	}
	endShape();
}