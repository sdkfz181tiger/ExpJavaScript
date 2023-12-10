"use strict"

const COLORS = ["#007200", "#008000", "#38B000", "#70E000", "#9EF01A", "#CCFF33"];
const DARKS  = ["#004B23", "#006400"];
const BLACK = "#007200";
const WHITE = "#006400";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);

	noFill();
	stroke(WHITE); strokeWeight(1);
	//noStroke();

	const len = 20;
	const pX = len*1.5 + len*cos(60);
	const oY = len * sin(60);
	const pY = (len*1.5) * sin(60);
	const oX = len + (len*1.5) * cos(60);

	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX);
	for(let r=0; r<rows; r++){
		for(let c=-cols; c<cols; c++){
			const x = c * pX + r * oX;
			const y = r * pY - c * oY;
			drawAjiro(x, y, len, r, c);
		}
	}
}

function drawAjiro(x, y, len, r, c){

	const dirs = [0, 60, 180, 240];

	if(r%3==0 && c%3==0){
		for(let i=0; i<6; i++){
			fill(getColor(COLORS));
			drawShape(x, y, len, i*60, dirs);
		}
	}else{
		for(let i=0; i<2; i++){
			fill(getColor(DARKS));
			drawShape(x, y, len, i*60, dirs);
		}
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
		if(dir%90==0){
			current.x += len * cos(dir);
			current.y += len * sin(dir);
		}else{
			current.x += (len*1.5) * cos(dir);
			current.y += (len*1.5) * sin(dir);
		}
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}