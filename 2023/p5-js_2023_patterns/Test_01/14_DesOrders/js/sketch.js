"use strict"

const COLORS = ["#E9311A", "#ED6335", "#ECAE7D", "#8DB4AD", "#026C80", "#064C72"];
const WHITE  = "#DDDDDD";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	stroke(BLACK); strokeWeight(1);
	strokeCap(SQUARE);

	const num = 8;
	const len = ((width<height)?width/num:height/num)*0.9;
	const sX = width / 2 - len * num / 2;
	const sY = height / 2 - len * num / 2;

	for(let r=0; r<num; r++){
		for(let c=0; c<num; c++){
			let x = floor(sX + c * len + len / 2);
			let y = floor(sY + r * len + len / 2);
			drawSquare(x, y, len);
		}
	}
}

function drawSquare(x, y, len, rot=0){

	const list = getColorList(COLORS);
	const buf = len * 0.05;

	const total = 6;
	const l = len / total;
	push();
	translate(x, y);
	rotate(rot);
	for(let i=0; i<total; i++){
		if(random() < 0.2) continue;
		//fill(getColor(COLORS));
		fill(list[i%list.length]);
		const bX = floor(random(-buf, buf));
		const bY = floor(random(-buf, buf));
		square(bX, bY, len-l*i, len*0.05);
	}
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function getColorList(colors){
	const list = Array.from(colors);
	for(let i=list.length-1; 0<=i; i--){
		const rdm = floor(random(i));
		const tmp = list[rdm];
		list[rdm] = list[i];
		list[i] = tmp;
	}
	return list;
}