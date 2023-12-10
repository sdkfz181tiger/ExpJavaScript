"use strict"

const COLORS = ["#F7B267", "#F79D65", "#F4845F", "#F27059", "#F25C54"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	stroke(WHITE); strokeWeight(1);

	const len = 20;
	const pX = len*6*cos(30);
	const pY = len*5*sin(30);
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=-1; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = pX * c;
			let y = pY * r;
			if(r%2==0) x -= pX/2;
			fill(getColor(COLORS));
			drawMatsukawa(x, y, len);
		}
	}
}

function drawMatsukawa(x, y, len){
	const dirs = [
		{d:30, l:len*2}, {d:150, l:len*1},
		{d:30, l:len*2}, {d:150, l:len*2},
		{d:30, l:len*1}, {d:150, l:len*2},
		{d:210,l:len*2}, {d:330, l:len*1},
		{d:210,l:len*2}, {d:330, l:len*2},
		{d:210,l:len*1}];
	drawShape(x, y, len, 0, dirs);
	//circle(x, y, 5);
}

function drawShape(x, y, len, rot, dirs){

	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: 0, y: 0};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += dir.l * cos(dir.d);
		current.y += dir.l * sin(dir.d);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}