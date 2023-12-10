"use strict"

const COLORS = ["#87A330", "#A1C349", "#CAD593"];
const WHITE  = "#ECF39E";
const BLACK  = "#243010";
const GREEN  = "#ffff3f";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();
	strokeCap(PROJECT);

	const w  = 14;
	const h  = w * 1.2;
	const pX = w * 6.5;
	const pY = h * 5.5;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(r%2==0) x -= pX * 0.5;
			const rot = random(10, 25);
			if(r==floor(rows/3) && c==floor(cols/2)){
				drawClover4(x, y, w, h, rot);
			}else{
				drawClover3(x, y, w, h, rot);
			}
		}
	}
}

function drawClover3(x, y, w, h, rot=0){

	const c = getColor(COLORS);
	fill(c);
	noStroke();

	push();
	translate(x, y);
	rotate(rot);
	drawHeart(0, 0, w, h, 0);
	drawHeart(0, 0, w, h, 100);
	drawHeart(0, 0, w, h, -100);

	noFill();
	stroke(c); strokeWeight(w*0.35);
	bezier(0, 0, -w*0.1, h, 0, h*1.5, w*0.8, h*2.0);

	pop();
}

function drawClover4(x, y, w, h, rot=0){

	const c = GREEN;
	fill(c);
	noStroke();

	push();
	translate(x, y);
	rotate(rot);
	drawHeart(0, 0, w, h, 42);
	drawHeart(0, 0, w, h, 128);
	drawHeart(0, 0, w, h, -42);
	drawHeart(0, 0, w, h, -128);

	noFill();
	stroke(c); strokeWeight(w*0.35);
	bezier(0, 0, -w*0.1, h, 0, h*1.5, w*0.8, h*2.0);

	pop();
}

function drawHeart(x, y, w, h, rot=0){

	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	for(let t=0; t<360; t+=6){
		const x = w * sin(t)**3;
		const y = h * cos(t)-(w*0.4)*cos(2*t)-2*cos(3*t)-cos(4*t);
		vertex(x, -y-h);
	}
	endShape();
	circle(0, 0, 5);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}