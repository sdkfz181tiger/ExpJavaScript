"use strict"

const COLORS = ["#FFFCF2", "#CCC5B9", "#403D39", "#252422", "#EB5E28"];
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

	//stroke(WHITE); strokeWeight(1);

	let len = 30;
	const pX = len * 3;
	const pY = len * 3;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = floor(c * pX);
			let y = floor(r * pY);
			if(r%2==0) x += pX / 2;
			drawKemanmon(x, y, len, 30);
		}
	}
}

function drawKemanmon(x, y, len, oD){

	fill(getColor(COLORS));
	noStroke();

	const pD = oD * 1.5;
	const total = 360 / pD;
	for(let i=0; i<total; i++){
		drawMoon(x, y, len, oD, i*pD);
	}
}

function drawMoon(x, y, len, oD, rot=0){

	push();
	translate(x, y);
	rotate(rot);
	const aX = len/2 * cos(-oD) + len*0.1;
	const aY = len/2 * sin(-oD) + len*0.1;
	const bX = len/2 * cos(0) + len*0.1;
	const bY = len/2 * sin(0) + len*0.1;
	beginShape();
	dotArc(aX, aY, len/2, 180-oD, 180-oD, false);
	dotArc(bX, bY, len/2, -oD, 180+oD, true);
	endShape();
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