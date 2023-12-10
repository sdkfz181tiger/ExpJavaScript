"use strict"

// ICOOON MONO
// https://icooon-mono.com/

const COLORS = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];
const COLOR_A = "#FCFCFF";

let chiImg, chiW, chiH, chiAsp;

function preload(){
	// Image
	chiImg = loadImage("chidori.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	// Size, Aspect
	chiW   = chiImg.width;
	chiH   = chiImg.height;
	chiAsp = chiW / chiH;
}

function draw(){
	background(COLOR_A);

	noFill();
	noStroke();

	drawChidoris(height*0.25, height*0.55);
	drawSeigaiha(height*0.65, height);
}

function drawChidoris(minY, maxY){

	for(let i=0; i<12; i++){
		const x = random(width);
		const y = minY + random(maxY-minY);
		const len = random(chiW/5, chiW/4);
		const deg = random(-10, 20);
		drawBird(x, y, len, deg, getColor());
	}
}

function drawBird(x, y, len, deg=0, cMain){

	const target = createImage(chiW, chiH);
	target.copy(chiImg, 0, 0, chiW, chiH, 0, 0, chiW, chiH);
	target.resize(len, len*chiAsp);

	push();
	translate(x, y);
	rotate(deg);
	tint(cMain);
	image(target, 0, 0);
	pop();
}

function drawSeigaiha(minY, maxY){

	const dia = width / 15;
	const weight = dia * 0.1;
	const rows = (maxY-minY) / (dia*0.3) + 2;
	const cols = width / dia + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * dia;
			let y = minY + r * (dia*0.35);
			if(r%2==0) x += dia / 2;
			fill(COLOR_A);
			stroke(getColor()); strokeWeight(weight);
			circle(x, y, dia);
			circle(x, y, dia*0.5);
		}
	}
}

function drawCircle(x, y, dia){
	circle(x, y, dia);
	circle(x, y, dia*0.7);
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}