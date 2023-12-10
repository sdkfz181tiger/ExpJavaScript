"use strict"

const GREEN = "#7BA05B";
const WHITE = "#FEFEFA";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
	strokeCap(PROJECT);
}

function draw(){
	background(222);
	noStroke();

	const w = 40;
	const h = 100;
	const deg = 30;
	const pX = w * cos(deg);
	const rows = floor(height / h) + 2;
	const cols = floor(width / w) + 1;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * pX * 2;
			const y = r * h - h / 2;
			const d = (c%2==0) ? deg:-deg;
			if(r%2==0){
				drawArrow(x, y, w, h, d, GREEN, WHITE);
			}else{
				drawArrow(x, y, w, h, d, WHITE, GREEN);
			}
		}
	}
}

function drawArrow(x, y, w, h, deg, cMain, cSub){
	fill(cMain);
	noStroke();
	drawRhombus(x, y, w, h, deg);
	drawRhombus(x, y, w, h, 180-deg);
	stroke(cSub); strokeWeight(w*0.08);
	line(x, y, x, y+h);
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