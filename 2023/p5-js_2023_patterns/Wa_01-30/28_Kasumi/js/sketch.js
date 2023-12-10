"use strict"

const COLORS = ["#CFE8EF", "#C6DBF0", "#AED1E6", "#A0C4E2", "#85C7DE"];
const WHITE = "#FFFFFF";
const AQUA  = "#8899AA"
const BLUE  = "#336699";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLUE);
	noFill();
	noStroke();

	drawAjiro();
	drawKasumi();
}

function drawAjiro(){

	noFill();
	stroke(AQUA); strokeWeight(1);

	const len = 20;
	const pX = len*1.5 + len*cos(60);
	const oY = len * sin(60);
	const pY = (len*1.5) * sin(60);
	const oX = len + (len*1.5) * cos(60);

	const rows = floor(height / pY) + 5;
	const cols = floor(width / pX);
	for(let r=0; r<rows; r++){
		for(let c=-cols; c<cols; c++){
			const x = c * pX + r * oX;
			const y = r * pY - c * oY;
			drawAjiroUnit(x, y, len, r, c);
		}
	}
}

function drawAjiroUnit(x, y, len, r, c){

	const dirs = [0, 60, 180, 240];
	for(let i=0; i<3; i++){
		drawShape(x, y, len, i*60, dirs);
	}
}

function drawShape(x, y, len, rot, dirs){
	push();
	translate(x, y);
	rotate(rot);
	beginShape();
	let current = {x: 0, y: 0};
	vertex(current.x, current.y);
	for(let dir of dirs){
		if(dir%90==0){
			current.x += len * cos(dir);
			current.y += len * sin(dir);
		}else{
			current.x += (len*1.5) * cos(dir);
			current.y += (len*1.5) * sin(dir);
		}
		vertex(current.x, current.y);
	}
	endShape(CLOSE);
	pop();
}

function drawKasumi(){

	noFill();
	noStroke();

	const pY = 60;
	const rows = floor(height / pY);
	for(let r=1; r<rows; r++){
		const cols = (random()<0.5) ? 1:2;
		for(let c=0; c<cols; c++){
			const x = random(width);
			const y = r * pY + random(height*0.2);
			const rad  = random(6, 12);
			const lenA = random(100, 180);
			const lenB = random(30, 80);
			const lenC = random(120, 300);
			const strC = random(0.8, 1.0);
			fill("rgba(255,255,255," + strC + ")");
			drawKasumiUnit(x, y, rad, lenA, lenB, lenC);
		}
	}
}

function drawKasumiUnit(x, y, rad, a, b, c){

	push();
	translate(x, y);
	beginShape();

	const aXl = 0;
	const aXr = a + rad*2;
	const bufB = (a+rad*2) - (b+rad*2);
	const bXl = aXl + bufB * random();
	const bXr = bXl + (b+rad*2);
	const bufC = (b+rad*2) - (c+rad*2);
	const cXl = bXl + bufC * random();
	const cXr = cXl + (c+rad*2);

	dotArc(aXl, 0, rad, 90, 180, true);
	dotArc(aXr, 0, rad, 270, 180, true);
	dotArc(bXr, rad*2, rad, 270, 180, false);
	dotArc(cXr, rad*4, rad, 270, 180, true);
	dotArc(cXl, rad*4, rad, 90, 180, true);
	dotArc(bXl, rad*2, rad, 90, 180, false);

	endShape(CLOSE);
	pop();
}

function dotArc(x, y, rad, from, progress, clockwise=true){
	for(let i=0; i<=progress; i+=3){
		const d = clockwise ? from+i:from-i;
		vertex(x+rad*cos(d), y+rad*sin(d));
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}