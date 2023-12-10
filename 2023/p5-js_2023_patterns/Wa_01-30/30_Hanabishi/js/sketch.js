"use strict"

const COLORS = ["#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD", "#D4A373"];
const WHITE = "#FFFFFF";
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

	const rad = 30;
	const pX = rad * 2.2;
	const pY = rad * 3.2;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(c%2==0) y += pY / 2;
			drawHana(x, y, rad);
		}
	}
}

function drawHana(x, y, rad){

	noFill();
	stroke(WHITE); strokeWeight(rad*0.04);

	const w = rad * 3.8;
	const h = rad * 2.8;

	push();
	beginShape();
	translate(x, y);
	vertex(w/2, 0);
	vertex(0, h/2);
	vertex(-w/2, 0);
	vertex(0, -h/2);
	endShape(CLOSE);
	pop();

	fill(getColor(COLORS));
	noStroke();

	drawHanaUnit(x, y, rad*0.8, 335);// Right
	drawHanaUnit(x, y, rad*1.0, 0);
	drawHanaUnit(x, y, rad*0.8, 25);
	drawHanaUnit(x, y, rad*0.75, 62);// Bottom
	drawHanaUnit(x, y, rad*0.80, 90);
	drawHanaUnit(x, y, rad*0.75, 118);
	drawHanaUnit(x, y, rad*0.8, 155);// Left
	drawHanaUnit(x, y, rad*1.0, 180);
	drawHanaUnit(x, y, rad*0.8, 205);
	drawHanaUnit(x, y, rad*0.75, 242);// Top
	drawHanaUnit(x, y, rad*0.80, 270);
	drawHanaUnit(x, y, rad*0.75, 298);

	stroke(BLACK); strokeWeight(rad*0.08);
	line(x, y, x+rad*0.35, y);
	line(x, y, x, y+rad*0.3);
	line(x, y, x-rad*0.35, y);
	line(x, y, x, y-rad*0.3);
	circle(x, y, rad*0.25);
}

function drawHanaUnit(x, y, rad, rot=0){

	const circleD = sqrt(rad**2 + rad**2 - 2*rad*rad*cos(30));
	push();
	translate(x, y);
	rotate(rot);
	const lenC = rad*cos(15);
	const pTopC = {x: lenC*cos(0), y: lenC*sin(0)}
	beginShape();
	vertex(0, 0);
	vertex(pTopC.x, pTopC.y-circleD/2);
	vertex(pTopC.x, pTopC.y+circleD/2);
	endShape(CLOSE);
	circle(pTopC.x, pTopC.y, 5);
	circle(pTopC.x, pTopC.y, circleD);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}