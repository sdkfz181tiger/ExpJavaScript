"use strict"

const COLORS = ["#F6BD60", "#F7EDE2", "#F5CAC3", "#84A59D", "#F28482"];
const WHITE = "#FFFFFF";
const BLACK = "#5E6472";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	noStroke();
	strokeCap(PROJECT);

	const len = 30;
	const pX = (len/2*sqrt(3));
	const oY = len * cos(60);
	const pY = len*3;

	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;

	for(let r=0; r<rows; r++){
		for(let c=-1; c<cols; c++){
			let x = c * pX * 3;
			let y = r * pY;
			let rot = (c%2!=0) ? 180:0;
			if(r%2==0) x += pX * 2;
			if(c%2==0) y += oY;
			drawBishamon(x, y, len, rot);
		}
	}
}

function drawBishamon(x, y, len, rot=0){

	const dirs = [30, 90, 30, 90, 150, 210, 150, 210, 270, 330, 270];
	fill(getColor(COLORS));
	stroke(WHITE); strokeWeight(len*0.1);
	drawShape(x, y, len, rot, dirs);
}

function drawShape(x, y, len, rot, dirs){
	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: 0, y: -len*2};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += len * cos(dir);
		current.y += len * sin(dir);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	line(0, 0, len*cos(30),  len*sin(30));
	line(0, 0, len*cos(150), len*sin(150));
	line(0, 0, len*cos(270), len*sin(270));
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}