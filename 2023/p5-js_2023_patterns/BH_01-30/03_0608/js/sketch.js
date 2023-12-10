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
	background(WHITE);
	noFill();
	noStroke();
	strokeCap(SQUARE);

	stroke(WHITE); strokeWeight(1);

	const len = 120;
	const rows = floor(height/len) + 2;
	const cols = floor(width/len) + 2;

	for(let r=-rows; r<rows; r++){
		for(let c=-cols; c<cols; c++){
			const x = c * len;
			const y = r * len;
			const rot = floor(random(4)) * 90;
			drawUnit(x, y, len, rot);
		}
	}
}

function drawUnit(x, y, len, rot=0){

	const colors = getColorList(COLORS);
	const cMain  = colors[0];
	const cSub   = colors[1];

	push();
	translate(x, y);
	rotate(rot);
	fill(cMain); noStroke();
	square(0, 0, len);
	if(random() < 0.8){
		const w      = len / 2;
		const dia    = len * 2 - w;
		noFill(); stroke(cSub); strokeWeight(w);
		arc(-len/2, len/2, dia, dia, 270, 360);
	}else{
		const w      = 1;
		const dia    = len * 2 - w;
		noFill(); stroke(cSub); strokeWeight(w);
		arc(-len/2, len/2, dia, dia, 270, 360);
		for(let i=0; i<10; i++){
			const d = dia - dia * (0.1 * i);
			arc(-len/2, len/2, d, d, 270, 360);
		}
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