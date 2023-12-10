"use strict"

const COLORS = ["#F0EAD2", "#DDE5B6", "#ABC178", "#A98467", "#6C584C"];
const WHITE  = "#FFFFFF";
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

	const len = 40;
	const pad = len * 2;
	const rows = floor(height / pad) + 2;
	const cols = floor(width / pad) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = pad * c;
			let y = pad * r;
			drawFusha(x, y, len);
		}
	}
}

function drawFusha(x, y, len){

	fill(getColor(COLORS));
	noStroke();

	triangle(x, y, x+len, y+len, x, y+len);
	triangle(x, y, x-len, y, x-len, y+len);
	triangle(x, y, x-len, y-len, x, y-len);
	triangle(x, y, x+len, y-len, x+len, y);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}