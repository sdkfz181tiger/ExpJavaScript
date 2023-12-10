"use strict"

const COLORS = ["#ccd5ae", "#e9edc9", "#fefae0", "#faedcd", "#d4a373"];
const WHITE = "#FFFFFF";
const BLACK = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(33);

	const w = 100;
	const h = 50;
	const oX = sqrt(w**2 + w**2);
	const oY = h * sqrt(2);
	const rows = floor(height / oY) + 1;
	const cols = floor(width / oX) + 1;
	for(let r=-1; r<rows; r++){
		for(let c=-1; c<cols; c++){
			const x = c * oX;
			const y = r * oY;
			drawHigaki(x, y, w, h);
		}
	}
}

function drawHigaki(x, y, w, h){

	fill(getColor(COLORS));
	stroke(BLACK); strokeWeight(w*0.04);

	push();
	translate(x, y);
	rotate(45);
	beginShape();
	rect(0, 0, w, h);
	endShape();
	pop();

	push();
	translate(x+w*cos(45)+h*cos(135), y+w*sin(45)+h*sin(135));
	rotate(-45);
	beginShape();
	rect(0, 0, w, h);
	endShape();
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}