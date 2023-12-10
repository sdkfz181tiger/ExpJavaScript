"use strict"

const COLORS = ["#463F3A", "#8A817C", "#BCB8b1", "#F4F3EE", "#E0AFA0"];
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

	stroke(BLACK); strokeWeight(1);

	const len = 60;
	const pad = len;
	const rows = floor(height / pad) + 2;
	const cols = floor(width / pad) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = floor(c * pad);
			const y = floor(r * pad);
			drawChidoriManji(x, y, len);
		}
	}
}

function drawChidoriManji(x, y, len){

	fill(getColor(COLORS));

	const rad = len * 0.1;
	const off = len / 360;

	push();
	translate(x, y);
	beginShape();
	for(let i=0; i<360; i+=10){
		const x = off * i;
		const y = -rad * sin(i);
		vertex(x, y);
	}
	for(let i=0; i<360; i+=10){
		const x = rad * sin(i) + len;
		const y = off * i;
		vertex(x, y);
	}
	for(let i=0; i<360; i+=10){
		const x = -off * i + len;
		const y = rad * sin(i) + len;
		vertex(x, y);
	}
	for(let i=0; i<360; i+=10){
		const x = -rad * sin(i);
		const y = -off * i + len;
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}