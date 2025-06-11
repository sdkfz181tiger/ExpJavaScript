"use strict"

const DEG_TO_RAD = Math.PI / 180;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	noFill();
	strokeWeight(1);
	stroke(22, 22, 99);
}

function draw(){
	background("#cccccc");

	const cX = width / 2;
	const cY = height / 2;

	drawUnitA(cX*0.2, cY, 100);
	drawUnitB(cX*0.4, cY, 100);
	drawUnitC(cX, cY, 100);
}