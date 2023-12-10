"use strict"

const GREEN_A = "#4A5D23";
const GREEN_B = "#8A9A5B";
const GREEN_C = "#013220";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
	strokeCap(ROUND);
}

function draw(){
	background(33);
	noStroke();

	const len = 80;
	const pX = sqrt(len**2*2 - 2*len*len*cos(120));
	const pY = len + len * cos(60);
	const rows = floor(height / pY) + 1;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = (r%2==0) ? c*pX:c*pX+pX/2;
			const y = r * pY;
			drawKikko(x, y, len);
		}
	}
}

function drawKikko(x, y, len){
	drawHexagon(x, y, len, GREEN_A, GREEN_B, len*0.04);
	drawHexagon(x, y, len*0.8, GREEN_A, GREEN_C, len*0.08);
}

function drawHexagon(x, y, len, cMain, cSub, weight){

	fill(cMain);
	if(cSub==null){
		noStroke();
	}else{
		stroke(cSub); strokeWeight(weight);
	}

	const o = 360 / 6;
	push();
	translate(x, y);
	beginShape();
	for(let i=0; i<=6; i++){
		const d = o * i + o/2;
		const x = len * cos(d);
		const y = len * sin(d);
		vertex(x, y);
	}
	endShape();
	pop();
}