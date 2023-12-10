"use strict"

const COLORS = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const WHITE  = "#EEEEEE";
const BLACK  = "#003554";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();
	strokeCap(PROJECT);

	const dia = 30;
	//const weight = dia / 8;
	stroke(WHITE); strokeWeight(1);

	const pX   = dia;
	const pY   = dia * 2;
	const rows = floor(height/pY) + 2;
	const cols = floor(width/pX) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * pX;
			const y = r * pY;
			const from = (c%2==0) ? 0:180;
			const to   = from + 180;
			arc(x, y, dia, dia, from, to);
		}
	}
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