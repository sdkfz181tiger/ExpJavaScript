"use strict"

const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	stroke(WHITE); strokeWeight(1);
	strokeCap(SQUARE);

	const gSize = 100;
	drawGrid(width/2, height/2, 3, 6, gSize, 0);
}

function drawGrid(x, y, rows, cols, gSize, rot=0){

	push();
	translate(x, y, gSize);
	rotate(rot);
	const sX = (cols-1) * gSize / -2;
	const sY = (rows-1) * gSize / -2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const pX = floor(sX + c * gSize);
			const pY = floor(sY + r * gSize);
			//drawRdmShape(pX, pY, gSize);
			drawRdmCross(pX, pY, gSize/4);
		}
	}
	pop();
}

function drawRdmShape(x, y, len){
	circle(x, y, len*1.5);
}

function drawRdmCross(x, y, len){
	drawCross(x, y, len);
}

function drawCross(x, y, len){
	line(x, y, x-len, y);// L
	line(x, y, x+len, y);// R
	line(x, y-len, x, y);// T
	line(x, y+len, x, y);// B
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function getColorList(colors){
	const list = Array.from(colors);
	for(let i=list.length-1; 0<=i; i--){
		const rdm = floor(random(i));
		const tmp = list[rdm];
		list[rdm] = list[i];
		list[i] = tmp;
	}
	return list;
}