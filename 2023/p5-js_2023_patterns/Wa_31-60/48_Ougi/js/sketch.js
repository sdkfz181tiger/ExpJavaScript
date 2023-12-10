"use strict"

const COLORS = ["#F7B267", "#F79D65", "#F4845F", "#F27059", "#F25C54"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";
const BROWN  = "#CC9933";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	noStroke();

	//stroke(WHITE); strokeWeight(1);

	const len = 130;
	const dD  = 14;
	const oD  = 2;
	const pX = len * cos((180-(dD+oD)*7)/2) * 2.4;
	const pY = len * 1.2;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=-1; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = pX * c;
			let y = pY * r;
			if(r%2==0) x += pX / 2;
			drawOugi(x, y, len, dD, oD);
		}
	}
}

function drawOugi(x, y, len, dD, oD, rot=0){

	const pD = dD + oD;
	const sD = 180 + (180-pD*7)/2;

	push();
	translate(x, y);
	rotate(rot);

	fill(WHITE);
	arc(0, 0, len*2, len*2, sD, sD+pD*7-oD);
	for(let i=0; i<7; i++){
		fill(getColor(COLORS));
		arc(0, 0, len*2, len*2, sD+pD*i, sD+pD*i+dD);
	}
	fill(WHITE);
	arc(0, 0, len*0.9, len*0.9, sD, sD+pD*7-oD);
	fill(BROWN);
	for(let i=0; i<7; i++){
		arc(0, 0, len*0.85, len*0.85, sD+pD*i, sD+pD*i+dD);
	}
	arc(0, 0, len*0.2, len*0.2, sD-180, sD+pD*7-oD-180)

	//circle(0, 0, 5);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}