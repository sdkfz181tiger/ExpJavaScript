"use strict"

const COLOR_A = "#C8B1E4";
const COLOR_B = "#532B88";
const COLOR_C = "#9B72Cf";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(COLOR_A);

	const len  = 40;
	const rows = floor(height / len) + 2;
	const cols = floor(width / len) + 2;
	const pX   = len * cos(45) * 2 + len * 0.5;
	const pY   = len * cos(45) * 2;
	for(let c=0; c<cols; c++){
		for(let r=0; r<rows; r++){
			const x = c * pX;
			const y = r * pY;
			const cMain = (r%2==0) ? COLOR_B:COLOR_C;
			drawDiamond(x, y, len, cMain);
			drawDiamond(x, y, len*0.35, COLOR_A);
		}
		fill(COLOR_B);
		noStroke();
		const wL = len*0.18;
		rect(c*pX-pX/2 - wL*0.8, height/2, wL, height);
		rect(c*pX-pX/2 + wL*0.8, height/2, wL, height);
	}
}

function drawDiamond(x, y, len, cMain){

	fill(cMain);
	noStroke();

	push();
	translate(x, y);
	rotate(45);
	square(0, 0, len);
	pop();
}