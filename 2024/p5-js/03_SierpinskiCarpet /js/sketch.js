"use strict"

const WHITE = "#eeeeee";
const BLACK = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop(); noFill(); noStroke();
}

function draw(){
	background(BLACK);

	const len = (width<height)?width*0.8:height*0.8;
	const x = width/2 - len/2;
	const y = height/2 - len/2;
	drawFractal(x, y, len, 3);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function drawFractal(x, y, len, depth){
	fill(WHITE);
	square(x, y, len);
	fill(BLACK);
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