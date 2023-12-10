"use strict"

const COLORS = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];
const WHITE  = "#EEEEEE";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	noStroke();

	const short = 10;
	const long  = short * 6;
	const pX = short * 7 + long;
	const pY = pX / 2;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = pX * c;
			let y = pY * r;
			if(r%2==0) x -= pX / 2;
			drawSangi(x, y, short, long);
		}
	}
}

function drawSangi(x, y, short, long){
	fill(getColor(COLORS));
	drawSangiUnit(x, y, short, long, true);
	fill(getColor(COLORS));
	drawSangiUnit(x + long/2+short*3.5, y, short, long, false);
}

function drawSangiUnit(x, y, short, long, flg){

	if(flg){
		rect(x, y, long, short);
		rect(x, y-short*2, long, short);
		rect(x, y+short*2, long, short);
	}else{
		rect(x, y, short, long);
		rect(x-short*2, y, short, long);
		rect(x+short*2, y, short, long);
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}