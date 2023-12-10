"use strict"

const COLORS = ["#119DA4", "#0C7489", "#13505B", "#040404", "#D7D9CE"];
const WHITE = "#FFFFFF";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(WHITE);

	noFill();
	stroke(WHITE); strokeWeight(1);
	//noStroke();

	const len = 40;
	const pX = len*2 + len*cos(60);
	const oY = len * sin(60);
	const pY = len*sin(60) * 2;
	const oX = len*2;

	const rows = floor(height / pY) * 2 + 5;
	const cols = floor(width / pX) * 2;
	const w = cols * (pX+pY);

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c*pX + r*oX - w / 2;
			let y = r*pY - c*oY;
			drawManji(x, y, len);
		}
	}
}

function drawManji(x, y, len){
	const dirs = [0, 300, 0, 120, 60, 120, 240, 180];
	for(let i=0; i<2; i++){
		fill(getColor());
		drawShape(x, y, len, i*60, dirs);
	}
}

function drawShape(x, y, len, rot, dirs){
	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: 0, y: 0};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += len * cos(dir);
		current.y += len * sin(dir);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}