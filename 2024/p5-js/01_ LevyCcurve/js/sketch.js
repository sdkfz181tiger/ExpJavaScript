"use strict"

const WHITE = "#eeeeee";
const BLACK = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); noLoop();
	stroke(WHITE); strokeWeight(2);
}

function draw(){
	background(BLACK);

	const aX = width * 0.3;
	const aY = height * 0.25;
	const bX = width * 0.7;
	const bY = height * 0.25;
	drawFractal(aX, aY, bX, bY, 14);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function drawFractal(aX, aY, bX, bY, depth){
	if(depth <= 0){
		line(aX, aY, bX, bY);
		return;
	}
	const mX = (aX + bX) / 2;
	const mY = (aY + bY) / 2;
	const len = sqrt((bX-aX)**2+(bY-aY)**2) / 2;
	const deg = atan2(bY-aY, bX-aX) + 90;
	const cX = mX + len * cos(deg);
	const cY = mY + len * sin(deg);
	drawFractal(aX, aY, cX, cY, depth-1);
	drawFractal(cX, cY, bX, bY, depth-1);
}