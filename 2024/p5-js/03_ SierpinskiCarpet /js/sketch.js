"use strict"

const COLORS = ["#3a7ca5", "#d9dcd6", "#16425b", "#81c3d7"];
const WHITE  = "#eeeeee";
const BLACK  = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); imageMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	frameRate(32); noLoop();
}

function draw(){
	background(BLACK);
	noFill(); noStroke();

	stroke(255); strokeWeight(1);

	const len = (width<height)?width*0.8:height*0.8;
	const x = width/2 - len/2;
	const y = height/2 - len/2;
	drawFractal(x, y, len, 3);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function drawFractal(x, y, len, depth){
	noStroke(); fill(WHITE);
	const pad = len / 3;
	for(let r=0; r<3; r++){
		for(let c=0; c<3; c++){
			const cX = x + pad*c;
			const cY = y + pad*r;
			if(r==1 && c==1){
				square(cX, cY, pad);
				continue;
			}
			if(depth <= 0) continue;
			drawFractal(cX, cY, pad, depth-1);
		}
	}
}