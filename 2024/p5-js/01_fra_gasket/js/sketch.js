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

	const cX = width / 2;
	const cY = height / 2;
	const len = 100;
	const gasket = new Gasket();
	gasket.draw(cX, cY, len, 2);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

class Gasket{

	constructor(){
		console.log("Gasket");
	}

	draw(x, y, len, depth){
		//line(sX, sY, eX, eY);

		const deg = -90;
		const aX = x + len * cos(deg);
		const aY = y + len * sin(deg);
		const bX = x + len * cos(deg+120);
		const bY = y + len * sin(deg+120);
		const cX = x + len * cos(deg+240);
		const cY = y + len * sin(deg+240);
		const points = [[aX, aY], [bX, bY], [cX, cY]];
		this.drawUnit(points, depth);
	}

	drawUnit(points, depth){
		if(depth <= 0) return;
		beginShape();
		for(let point of points){
			vertex(point[0], point[1]);
		}
		endShape(CLOSE);

		const pA = this.getMid(points[0], points[1]);
		const pB = this.getMid(points[1], points[2]);
		const pC = this.getMid(points[2], points[0]);
		this.drawUnit([pA, pB, pC], depth-1);

		this.drawUnit([points[0], pA, pC], depth-1);

	}

	getMid(pA, pB){
		const x = (pA[0] + pB[0]) / 2;
		const y = (pA[1] + pB[1]) / 2;
		return [x, y];
	}
}