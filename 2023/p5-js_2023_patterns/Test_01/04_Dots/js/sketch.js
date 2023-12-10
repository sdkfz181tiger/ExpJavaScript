"use strict"

const COLORS = ["#780000", "#C1121F", "#FDF0d5", "#003049", "#669BBC"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(250);
	rectMode(CENTER);
	noStroke();

	const tW   = floor((width<height)?width/12:height/12);
	const tH   = floor(tW/2 * sqrt(3));
	const rows = floor(height / tH);
	const cols = floor(width / tW);

	for(let r=0; r<=rows; r++){
		for(let c=0; c<=cols; c++){
			drawTriangle(r, c, tW, tH);
		}
	}
}

function drawTriangle(r, c, tW, tH){
	let x = c * tW;
	let y = r * tH;
	if(r%2==0) x += tW/2;
	connectLine(x, y, tW, 0);
	connectLine(x, y, tW, 60);
	connectLine(x, y, tW, 120);
	let rate = 0.15;
	if(r%4==0){
		if(c%2==0) rate = 0.25;
	}else if(r%2==0){
		if((c+1)%2==0) rate = 0.25;
	}
	drawCircle(x, y, tW*rate);
}

function connectLine(x, y, len, deg){
	stroke(220); strokeWeight(1);
	line(x, y, x+len*cos(deg), y+len*sin(deg));
	fill(getColor());
	noStroke();
	circle(x+len/2*cos(deg), y+len/2*sin(deg), len*0.08);
}

function drawCircle(x, y, dia){
	fill(getColor());
	noStroke();
	circle(x, y, dia);
}

function drawDiamond(x, y, dia){
	const off = dia * 0.05;
	push();
	translate(x, y);
	rotate(45);
	fill(220);
	square(off, off, dia, dia/5);
	fill(getColor());
	square(0, 0, dia, dia/5);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}