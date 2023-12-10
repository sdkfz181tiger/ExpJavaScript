"use strict"

const COLORS = ["#3D348B", "#7678ED", "#F7B801", "#F18701", "#F35B04"];
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
	noStroke(); strokeCap(ROUND);

	const len = 12;
	const pad = len * 3;
	const rows = floor(height / pad) + 2;
	const cols = floor(width / pad) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * pad;
			const y = r * pad;
			drawOmeshiju(x, y, len, ((r+c)%2==0));
		}
	}
}

function drawOmeshiju(x, y, len, flg){

	if(flg){
		fill(getColor(COLORS));
		noStroke();
		circle(x, y, len);
	}else{
		noFill();
		stroke(getColor(COLORS)); strokeWeight(len * 0.5);
		const l = len * 0.5;
		line(x-l, y-l, x+l, y+l);
		line(x+l, y-l, x-l, y+l);
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}