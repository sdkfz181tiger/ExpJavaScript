"use strict"

const COLORS = ["#8D99AE", "#EDF2F4", "#EF233C", "#D90429"];
const BLACK = "#2B2D42";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);

	noFill();
	//stroke(BLACK); strokeWeight(1);
	noStroke();

	const len = 20;
	const pX = len * 4;
	const pY = len * 4;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * pX;
			const y = r * pY;
			drawChidori(x, y, len);
		}
	}
}

function drawChidori(x, y, len){

	const dirs = [315, 315, 0, 315, 90, 0, 135, 90, 135, 135, 270, 315, 180, 270, 135];
	fill(getColor());
	drawShape(x, y, len, 0, dirs);
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
			current.x += len * cos(dir) * sqrt(2);
			current.y += len * sin(dir) * sqrt(2);
		}
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}