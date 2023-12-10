"use strict"

const COLOR_A = "#333333";
const COLOR_B = "#FCFCFC";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(33);

	const dia  = 65;
	const pX   = floor(dia * cos(30)) * 2;
	const pY   = floor(dia + dia * sin(30));
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(r%2==0) x += dia * cos(30);
			drawKikko(x, y, dia, false);
			drawKikko(x, y, dia*0.92, true);
			drawTomoe(x, y, dia*1.1);
		}
	}
}

function drawKikko(x, y, len, flg){
	fill(COLOR_A);

	if(flg){
		stroke(COLOR_B); strokeWeight(len * 0.04);
	}else{
		noStroke();
	}

	const o = 360 / 6;
	push();
	translate(x, y);
	beginShape();
	for(let i=0; i<=6; i++){
		const d = o * i + o/2;
		const x = len * cos(d);
		const y = len * sin(d);
		vertex(x, y);
	}
	endShape();
	pop();
}

function drawTomoe(x, y, dia){
	fill(COLOR_A);
	noStroke();

	circle(x, y, dia);
	drawTail(x, y, dia, 0);
	drawTail(x, y, dia, 120);
	drawTail(x, y, dia, 240);
	drawBall(x, y, dia, 0);
	drawBall(x, y, dia, 120);
	drawBall(x, y, dia, 240);
}

function drawTail(x, y, dia, deg){
	const bSize = dia * 0.44;
	push();
	translate(x, y);
	rotate(deg);
	fill(COLOR_B);
	arc(0, 0, dia, dia, -95, 0);
	fill(COLOR_A);
	arc(-dia*0.1, 0, dia*0.8, dia, -95, 0);
	pop();
}

function drawBall(x, y, dia, deg){
	const bSize = dia * 0.44;
	push();
	translate(x, y);
	rotate(deg);
	fill(COLOR_B);
	circle(dia/2-bSize/2, 0, bSize);
	pop();
}