"use strict"

const COLOR_A = "#ff7d00";
const COLOR_B = "#78290f";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(COLOR_A);

	const rad = 60;
	const pX = rad*cos(30) - sqrt((rad**2) / (2-2*cos(120))) * cos(60);
	const pY = (pX * 2) * sin(60);
	const rows = floor(height / pY);
	const cols = floor(width / pX);
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX * 2;
			let y = r * pY * 2;
			drawKagome(x, y, rad);
		}
	}
}

function drawKagome(x, y, rad){

	noFill();
	stroke(COLOR_B); strokeWeight(rad * 0.15);

	push();
	beginShape();
	translate(x, y);
	triangle(rad*cos(30), rad*sin(30), rad*cos(150), 
		rad*sin(150), rad*cos(270), rad*sin(270));
	triangle(rad*cos(90), rad*sin(90), rad*cos(210),
		rad*sin(210), rad*cos(330), rad*sin(330));
	endShape();
	pop();
}