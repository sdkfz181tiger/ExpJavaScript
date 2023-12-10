"use strict"

const COLORS = ["#780000", "#C1121F", "#FDF0d5", "#003049", "#669BBC"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(222);
	rectMode(CENTER);
	noStroke();
	const dia = 160;
	const rows = floor(height / dia) + 2;
	const cols = floor(width / dia) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * dia;
			let y = r * dia;
			if(r%2==0) x += dia / 2;
			if(r%4==0 && c%7==0){
				drawSlime(x, y, dia*0.8, "silver", "black");
			}else if(r%3==0 && c%3==0){
				drawSlime(x, y, dia*0.8, "red", "black");
			}else{
				drawSlime(x, y, dia*0.8, getColor(), "red");
			}
		}
	}
}

function drawSlime(x, y, dia, color="blue", mouth="red"){
	const s = dia / 2;
	push();
	fill(color);
	translate(x, y);
	beginShape();
	vertex(0, s);
	bezierVertex(-s, s, -s, s/2, -s, s/3);
	bezierVertex(-s, -s/3, -s/6, -s/3, -s/6, -s*5/6);
	bezierVertex(-s/6, -s, -s/6, -s, 0, -s);
	vertex(0, s);
	bezierVertex(s, s, s, s/2, s, s/3);
	bezierVertex(s, -s/3, s/6, -s/3, s/6, -s*5/6);
	bezierVertex(s/6, -s, s/6, -s, 0, -s);
	endShape();
	circle(0, -s*0.9, s/3);
	fill(255);
	circle(-s*0.35, s*0.1, s*0.4);
	circle(s*0.3, s*0.1, s*0.4);
	fill(33);
	circle(-s*0.35, s*0.1, s*0.2);
	circle(s*0.3, s*0.1, s*0.2);
	noFill();
	stroke(mouth); strokeWeight(s*0.15);
	arc(0, s*0.4, s*0.8, s*0.5, 20, 160);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}