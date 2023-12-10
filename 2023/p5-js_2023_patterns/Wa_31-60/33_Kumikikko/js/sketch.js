"use strict"

const COLORS = ["#DAD7CD", "#A3B18A", "#588157", "#3A5A40", "#344E41"];
const WHITE = "#EEEEFF";
const BLACK = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	let len = 18;
	const pX = len*cos(30)*2 + (len*3-len*sin(30))*cos(30);
	const pY = len * 3 + (len*cos(30)*2*sin(60));
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = floor(c * pX);
			let y = floor(r * pY);
			if(c%2==0) y -= (len*3-len*sin(30))*cos(30);
			drawKumikikko(x, y, len*0.95);
		}
	}
}

function drawKumikikko(x, y, len, rot=0){

	const times = 3;
	const long = len*times - len*sin(30);
	const dirs = [
		{d:30,  l:len},
		{d:90,  l:long}, {d:30,  l:long}, 
		{d:90,  l:len},  {d:150,  l:len}, 
		{d:210, l:long}, {d:150, l:long},
		{d:210, l:len},  {d:270,  l:len},
		{d:330, l:long}, {d:270, l:long}];
	const cY = -(len*times + len*tan(30));
	drawShape(x, y, 0, cY, len, rot, dirs);
	//circle(x, y, 5);
}

function drawShape(x, y, cX, cY, len, rot, dirs){

	fill(getColor(COLORS));
	stroke(BLACK); strokeWeight(len*0.2);

	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: cX, y: cY};
	vertex(current.x, current.y);
	for(let dir of dirs){
		current.x += dir.l * cos(dir.d);
		current.y += dir.l * sin(dir.d);
		vertex(current.x, current.y);
	}
	endShape(CLOSE);

	line(0, 0, len*2*cos(30), len*2*sin(30));
	line(0, 0, len*2*cos(150), len*2*sin(150));
	line(0, 0, len*2*cos(270), len*2*sin(270));
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}