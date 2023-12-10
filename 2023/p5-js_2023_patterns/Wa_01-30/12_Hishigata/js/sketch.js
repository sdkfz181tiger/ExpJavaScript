"use strict"

const RED   = "#960018";
const WHITE = "#F4C2C2";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(33);
	noStroke();

	const w = floor(width / 8);
	const h = floor(w * 0.4);
	const rows = floor(height / (h/2)) + 2;
	const cols = floor(width / w) + 1;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * w;
			let y = r * h / 2;
			if(r%2==0) x += w / 2;
			drawHishi(x, y, w, h);
		}
	}
}

function drawHishi(x, y, w, h){

	const hW = floor(w*0.25);
	const hH = floor(h*0.25);
	const oH = w * 0.02;

	drawDiamond(x, y, w, h, RED, WHITE, w*0.02);
	drawDiamond(x-hW/2-oH, y, hW, hH, WHITE);
	drawDiamond(x+hW/2+oH, y, hW, hH, WHITE);
	drawDiamond(x, y-hH/2-oH, hW, hH, WHITE);
	drawDiamond(x, y+hH/2+oH, hW, hH, WHITE);
}

function drawDiamond(x, y, w, h, cMain, cSub, weight=1){

	fill(cMain);
	if(cSub){
		stroke(cSub);
		strokeWeight(weight);
	}else{
		noStroke();
	}

	push();
	translate(x, y);
	beginShape();
	vertex(-w/2, 0);
	vertex(0, -h/2);
	vertex(w/2, 0);
	vertex(0, h/2);
	vertex(-w/2, 0);
	endShape();
	pop();
}