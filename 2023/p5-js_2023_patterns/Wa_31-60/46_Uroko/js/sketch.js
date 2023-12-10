"use strict"

const COLORS = ["#738290", "#A1B5D8", "#FFFCF7", "#E4F0D0", "#C2D8B9"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	//stroke(WHITE); strokeWeight(1);

	const len = 60;
	drawUroko(len);
}

function drawUroko(len, rot=0){

	const pX = len / 2;
	const pY = len * sin(60);
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 4;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = pX * c;
			let y = pY * r;
			if(r%2==0) x -= len / 2;
			const rot = (c%2==0)?0:180;

			const green = floor(map(y, 0, height, 0, 200));
			const blue  = floor(map(x, 0, width, 0, 200));
			const alpha = (rot==0) ? 190:255;
			fill(33, green, blue, alpha);
			stroke(33, green, blue, alpha);
			drawTriangle(x, y, len, rot);

			if(rot==0){
				fill(255, 255, 255, 220);
				noStroke();
				drawTriangle(x, y, len*0.3, rot);
			}
		}
	}
}

function drawTriangle(x, y, len, rot=0){

	const p = len * cos(30);
	const r = ((len/2)**2+p**2) / (p*2);
	if(rot==180) y = y + len*sin(60) - r*2;

	push();
	translate(x, y);
	rotate(rot);
	triangle(
		r*cos(30),  r*sin(30),
		r*cos(150), r*sin(150),
		r*cos(270), r*sin(270));
	//circle(0, 0, 5);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}