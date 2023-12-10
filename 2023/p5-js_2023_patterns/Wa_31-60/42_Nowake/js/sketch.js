"use strict"

const COLORS = ["#EDEDE9", "#D6CCC2", "#F5EBE0", "#E3D5CA", "#D5BDAF"];
const WHITE  = "#999999";
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

	stroke(WHITE); strokeWeight(1);

	const rad = 60;
	const weight = rad * 0.06;
	const pX  = rad * 2;
	const pY  = rad;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = floor(c * pX);
			let y = floor(r * pY);
			if(r%2==0) x -= rad;
			fill(getColor(COLORS));
			circle(x, y, rad*2);
			noFill();
			drawNowaki(x,     y, 0,   rad, weight, 0, 180, 360);
			drawNowaki(x-rad, y, rad, rad, weight, 15, 180, 240);
			drawNowaki(x-rad, y, rad, rad, weight, 30, 180, 230);
			drawNowaki(x-rad, y, rad, rad, weight, 45, 180, 220);
		}
	}
}

function drawNowaki(x, y, oX, rad, weight, rot, start, end){

	push();
	translate(x, y);
	rotate(rot);

	strokeWeight(weight);
	const pD = 4;
	const total = floor((end-start) / pD);
	for(let i=0; i<total; i++){
		if(i%2!=0) continue;
		const pX = oX + rad * cos(start+i*pD);
		const pY = rad * sin(start+i*pD);
		line(pX, pY, 
			oX + rad * cos(start+(i+1)*pD),
			rad * sin(start+(i+1)*pD));
	}
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}