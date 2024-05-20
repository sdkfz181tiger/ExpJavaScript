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

	const sX = width / 4;
	const sY = height / 2;
	const eX = width / 4 * 3;
	const eY = sY;
	const cCurve = new CCurve();
	cCurve.draw(sX, sY, eX, eY, 2);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

class CCurve{

	constructor(){
		console.log("CCurve");
	}

	draw(sX, sY, eX, eY, depth){
		//line(sX, sY, eX, eY);
		this.splitLine(sX, sY, eX, eY, depth);
	}

	splitLine(sX, sY, eX, eY, depth){

		if(depth <= 0){
			line(sX, sY, eX, eY);
			return;
		}

		const mX = (sX + eX) / 2;
		const mY = (sY + eY) / 2;
		const len = sqrt((eX-sX)**2+(eY-sY)**2) / 2;

		circle(mX, mY, 5);
		// Left
		this.splitLine(sX, sY, mX, mY, depth-1);
		const degL = atan2(mY-sY, mX-sX);
		const lX = sX + len * cos(degL-90);
		const lY = sY + len * sin(degL-90);
		this.splitLine(sX, sY, lX, lY, depth-1);
		// Right
		this.splitLine(mX, mY, eX, eY, depth-1);
		const degR = atan2(mY-eY, mX-eX);
		const rX = eX + len * cos(degR+90);
		const rY = eY + len * sin(degR+90);
		this.splitLine(eX, eY, rX, rY, depth-1);
	}
}