"use strict"

const COLORS = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const WHITE  = "#EEEEEE";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); //rectMode(CORNER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill(); noStroke();
	strokeCap(SQUARE);

	push();
	translate(width/2, height/2);
	rotate(30);
	const len = 60;
	const rows = floor(height / len) + 1;
	const cols = floor(width / len) + 1;
	for(let r=-rows; r<rows; r++){
		for(let c=-cols; c<cols; c++){
			const x = c * len;
			const y = r * len;
			const lineW = len / 10;
			const colors = getColorList(COLORS);
			const rdm = random();
			if(rdm < 0.25){
				drawShapeA(x, y, len, lineW, colors);
			}else if(rdm < 0.50){
				drawShapeB(x, y, len, lineW, colors);
			}else if(rdm < 0.75){
				drawShapeC(x, y, len, lineW, colors);
			}else{
				drawShapeD(x, y, len, lineW, colors);
			}
		}
	}
	pop();
}

function drawShapeA(x, y, len, lineW, colors){
	const lines = floor(len / lineW);
	push();
	translate(x, y);
	fill(colors[0]);
	square(0, 0, len);
	fill(colors[1]);
	for(let i=0; i<lines; i++){
		if(i%2!=0) continue;
		beginShape();
		vertex(0, lineW*i);
		vertex(len - lineW*i, lineW*i);
		vertex(len - lineW*(i+1), lineW*(i+1));
		vertex(0, lineW*(i+1));
		endShape(CLOSE);
	}
	pop();
}

function drawShapeB(x, y, len, lineW, colors){
	const lines = floor(len / lineW);
	push();
	translate(x, y);
	fill(colors[0]);
	square(0, 0, len);
	fill(colors[1]);
	for(let i=0; i<lines; i++){
		if(i%2!=0) continue;
		beginShape();
		vertex(len, lineW*i);
		vertex(len - lineW*i, lineW*i);
		vertex(len - lineW*(i+1), lineW*(i+1));
		vertex(len, lineW*(i+1));
		endShape(CLOSE);
	}
	pop();
}

function drawShapeC(x, y, len, lineW, colors){
	const lines = floor(len / lineW);
	push();
	translate(x, y);
	fill(colors[0]);
	square(0, 0, len);
	fill(colors[1]);
	for(let i=0; i<lines; i++){
		if(i%2!=0) continue;
		beginShape();
		vertex(lineW*i, 0);
		vertex(lineW*i, len - lineW*i);
		vertex(lineW*(i+1), len - lineW*(i+1));
		vertex(lineW*(i+1), 0);
		endShape(CLOSE);
	}
	pop();
}

function drawShapeD(x, y, len, lineW, colors){
	const lines = floor(len / lineW);
	push();
	translate(x, y);
	fill(colors[0]);
	square(0, 0, len);
	fill(colors[1]);
	for(let i=0; i<lines; i++){
		if(i%2!=0) continue;
		beginShape();
		vertex(lineW*i, len);
		vertex(lineW*i, len - lineW*i);
		vertex(lineW*(i+1), len - lineW*(i+1));
		vertex(lineW*(i+1), len);
		endShape(CLOSE);
	}
	pop();
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