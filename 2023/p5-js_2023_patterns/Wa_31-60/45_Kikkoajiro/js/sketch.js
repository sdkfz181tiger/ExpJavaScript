"use strict"

const LIGHTS = ["#F7D1CD", "#E8C2CA", "#D1B3C4"];
const DARKS  = ["#B392AC", "#735D78"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

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

	stroke(BLACK); strokeWeight(1);

	const len = 14;
	const pX = len * 3 * cos(30) * 2;
	const pY = len * 3 + len * 3 * sin(30);
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(r%2==0) x -= pX / 2;
			const cMain = getColor(LIGHTS);
			const cSub  = ((r+c)%2==0 && r%2==0)?DARKS[1]:DARKS[0];
			drawKikkoajiro(x, y, len, cMain, cSub);
		}
	}
}

function drawKikkoajiro(x, y, len, cMain, cSub){

	const dirs1 = [
		{d:330, l:len*3}, {d:90, l:len}, 
		{d:150, l:len*3}];
	const dirs2 = [
		{d:210, l:len}, {d:90, l:len*3}, 
		{d:30,  l:len}];
	const dirs3 = [
		{d:210, l:len*3}, {d:330, l:len}, 
		{d:30, l:len*3}];

	fill(cMain);
	drawShape(x, y, len, dirs1);
	drawShape(x, y+len*2, len, dirs1);
	drawShape(x, y, len, dirs2);
	drawShape(x+len*2*cos(210), y+len*2*sin(210), len, dirs2);
	drawShape(x, y, len, dirs3);
	drawShape(x+len*2*cos(30), y-len*2*sin(30), len, dirs3);

	fill(cSub);
	drawShape(x, y+len, len, dirs1);
	drawShape(x+len*cos(210), y+len*sin(210), len, dirs2);
	drawShape(x+len*cos(30), y-len*sin(30), len, dirs3);

	//circle(x, y, 5);
}

function drawShape(x, y, len, dirs){

	push();
	translate(x, y);
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