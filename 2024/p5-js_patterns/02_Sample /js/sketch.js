"use strict"

const WHITE = "#336699";
const BLACK = "#333366";

let cX, cY, pX, pY, nX, nY;
let radius, deg;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); frameRate(48);
	stroke(WHITE); strokeWeight(0.4);
	background(BLACK);

	cX = width / 2;
	cY = height / 2;

	nX = cX + radius * cos(deg);
	nY = cY + radius * sin(deg);
	nX = pX;
	nY = nY;

	radius = min(width, height) * 0.4;
	deg = 0;
}

function draw(){
	//background(BLACK);

	cX += random(-1, 1);
	cY += random(-1, 1);

	nX = cX + radius * cos(deg);
	nY = cY + radius * sin(deg);
	line(pX, pY, nX, nY);

	pX = nX;
	pY = nY;

	radius += random(-1, 1);
	deg += 2;
	
}