"use strict"

const COLORS = ["#3a7ca5", "#d9dcd6", "#16425b", "#81c3d7"];
const WHITE  = "#EEEEEE";
const BLACK  = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); imageMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	frameRate(32); noLoop();
}

function draw(){
	background(BLACK);
	noFill(); noStroke();

	stroke(255); strokeWeight(1);

	const aX = width * 0.3;
	const aY = height * 0.25;
	const bX = width * 0.7;
	const bY = height * 0.25;
	const cCurve = new CCurve();
	cCurve.draw(aX, aY, bX, bY, 14);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

class CCurve{

	constructor(){
		console.log("CCurve");
	}

	draw(aX, aY, bX, bY, depth){
		
		if(depth <= 0){
			line(aX, aY, bX, bY);
			return;
		}
		const mX = (aX + bX) / 2;
		const mY = (aY + bY) / 2;
		const len = sqrt((bX-aX)**2+(bY-aY)**2) / 2;
		const deg = atan2(bY-aY, bX-aX) + 90;
		const cX = mX + len * cos(deg);
		const cY = mY + len * sin(deg);
		this.draw(aX, aY, cX, cY, depth-1);
		this.draw(cX, cY, bX, bY, depth-1);
	}
}