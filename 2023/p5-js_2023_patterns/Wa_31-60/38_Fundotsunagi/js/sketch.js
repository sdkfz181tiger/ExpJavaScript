"use strict"

const COLORS = ["#CCDBDC", "#9AD1D4", "#80CED7", "#007EA7", "#003249"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

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

	stroke(WHITE); strokeWeight(1);

	const len = 40;
	drawFundoUnit(0, 0, len);
}

function drawFundoUnit(x, y, len){

	const distance = len * cos(45) * 2;
	const pX = distance * cos(45) * 2;
	const pY = distance * cos(45);

	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let oX = pX * c;
			let oY = pY * r;
			if(r%2==0) oX -= pX / 2;
			const rot = (r%2!=0)?135:45;
			drawFundo(x + oX, y + oY, len, rot);
		}
	}
}

function drawFundo(x, y, len, rot=0){

	fill(getColor(COLORS));
	stroke(WHITE); strokeWeight(len*0.05);

	push();
	translate(x, y);
	rotate(rot);

	beginShape();
	for(let i=0; i<360; i++){
		let x = len * cos(i);
		let y = len * sin(i);
		const maxX = len * cos(45);
		if(maxX < x){
			const diffX = x - maxX;
			x = maxX - diffX;
		}
		const minX = -len * cos(45);
		if(x < minX){
			const diffX = minX - x;
			x = minX + diffX;
		}
		vertex(x, y);
	}
	endShape();
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}