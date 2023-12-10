"use strict"

const COLORS = ["#3DCCC7", "#68D8D6", "#9CEAEF", "#C4FFF9", "#FFFFFF"];
const WHITE  = "#DDEEFF";
const BLACK  = "#333333";
const AQUA   = "#07BEB8";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(AQUA);
	noFill();
	noStroke();

	const len = 20;
	const pX = len * 4;
	const pY = len * 4;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = pX * c;
			let y = pY * r;
			if(r%2==0) x += pX / 2;
			const l = len * random(0.8,1.0);
			const rot = random(360);

			fill(getColor(COLORS));
			drawYukiwa(x, y, l, rot);
		}
	}
}

function drawYukiwa(x, y, len, rot=0){

	drawYukiwaUnit(x, y, len, rot+0);
	drawYukiwaUnit(x, y, len, rot+60);
	drawYukiwaUnit(x, y, len, rot+120);
	drawYukiwaUnit(x, y, len, rot+180);
	drawYukiwaUnit(x, y, len, rot+240);
	drawYukiwaUnit(x, y, len, rot+300);
}

function drawYukiwaUnit(x, y, len, rot=0){

	const large = len * 0.52;
	const mid   = len * 0.50;
	const small = len * 0.15;

	push();
	translate(x, y);
	rotate(rot);
	beginShape();

	vertex(0, 0);
	dotArc(len*cos(-30)*1.1, len*sin(-30)*1.1, small/2, 160, 110, false);
	dotArc(len*cos(-15),     len*sin(-15),     mid/2, -80, 100, true);
	dotArc(len*cos(0),       len*sin(0),       large/2, -40, 80, true);
	dotArc(len*cos(15),      len*sin(15),      mid/2, -20, 100, true);
	dotArc(len*cos(30)*1.1,  len*sin(30)*1.1,  small/2, -30, 130, false);
	endShape(CLOSE);
	pop();
}

function dotArc(x, y, rad, from, progress, clockwise=true){
	for(let i=0; i<=progress; i+=3){
		const d = clockwise ? from+i:from-i;
		vertex(x+rad*cos(d), y+rad*sin(d));
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}