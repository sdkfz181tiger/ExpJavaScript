"use strict"

const COLORS = ["#A1CCA5", "#8FB996", "#709775", "#415D43", "#111D13"];
const WHITE  = "#F2E8CF";
const GREEN  = "#386641";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(GREEN);

	const len = 100;
	const rows = floor(height / len) + 2;
	const cols = floor(width / len) + 2;
	for(let c=0; c<cols; c++){
		for(let r=0; r<rows; r++){
			let x = c * len;
			let y = r * len;
			if(r%2==0) x += len/2;
			const rdm = random(0.5, 0.6);
			drawSuzu(x, y, len*rdm, WHITE, GREEN);
		}
	}
}

function drawSuzu(x, y, len, cFill, cLine){
	fill(cFill);
	noStroke(); strokeWeight(len*0.1);

	push();
	translate(x, y);
	rotate(random(-30, 30));

	circle(0, 0, len);
	circle(0, -len*0.45, len*0.3);
	stroke(cLine);
	rect(0, len*0.03, len, len*0.2);
	noStroke();
	rect(0, len*0.03, len, len*0.2);
	circle(-len/2, len*0.03, len*0.2);
	circle(len/2, len*0.03, len*0.2);
	fill(cLine);
	rect(0, len*0.4, len*0.04, len*0.2);
	circle(0, len*0.35, len*0.16);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}