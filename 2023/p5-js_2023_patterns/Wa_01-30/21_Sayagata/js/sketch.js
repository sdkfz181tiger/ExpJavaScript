"use strict"

const COLORS = ["#05668D", "#427AA1", "#EBF2FA", "#679436", "#A5BE00"];
const COLOR_A = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(COLOR_A);

	const cX = width / 2;
	const cY = height / 2;
	const weight = 10;
	drawSayagata(cX, cY, weight, 45);
}

function drawSayagata(x, y, weight, deg=0){

	push();
	translate(x, y);
	rotate(deg);

	const pX = (weight * 9) + weight;
	const pY = (weight * 4) + weight;
	const rows = floor(height/pY) * 2;
	const cols = floor(width/pX) * 2;
	const sX = -pX * cols / 2;
	const sY = -pY * rows / 2;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = sX + pX * c;
			let y = sY + pY * r;
			if(r%2==0) x += pX/2;
			drawUnit(x, y, weight);
		}
	}

	pop();
}

function drawUnit(x, y, weight){

	fill(getColor());
	noStroke();

	const len1  = weight;
	const len2  = weight * 2;
	const len7  = weight * 7;
	const len13 = weight * 9;

	push();
	translate(x, y);

	rect(0, 0, len13, weight);
	// Left
	rect(-len13/2+weight/2, 0, weight, len7);
	rect(-len13/2+weight, -len7/4-weight/4, weight*2, weight);
	rect(-len13/2+weight, +len7/4+weight/4, weight*2, weight);
	// Right
	rect(+len13/2-weight/2, 0, weight, len7);
	rect(len13/2-weight, -len7/4-weight/4, weight*2, weight);
	rect(len13/2-weight, +len7/4+weight/4, weight*2, weight);

	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}