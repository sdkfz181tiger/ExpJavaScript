"use strict"

const COLORS = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(255);
	rectMode(CENTER);
	noStroke();

	const dia  = (width<height)?width/12:height/12;
	const pad  = dia * sqrt(2);
	const rows = floor(height / (pad/2)) + 2;
	const cols = floor(width / pad) + 2;

	const a = 1 / rows**2;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pad;
			let y = r * (pad / 2);
			if(r%2==0) x += pad / 2;
			const k = 1-((0.8/rows**2)*r**2);
			drawDiamond(x, y, dia*0.95 * k);
		}
	}
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