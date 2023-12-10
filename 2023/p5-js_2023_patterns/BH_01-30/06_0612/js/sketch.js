"use strict"

const COLORS = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const WHITE  = "#EEEEEE";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill(); noStroke();

	stroke(WHITE); strokeWeight(1);
	strokeCap(SQUARE);

	const cX = floor(width / 2);
	const cY = floor(height / 2);
	const len = 140;
	const rows = floor(height / len) + 1;
	const cols = floor(width / len) + 1;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * len + len/2;
			const y = r * len + len/2;
			const rot = floor(random(4)) * 90;
			drawUnit(x, y, len, rot);
		}
	}
}

function drawUnit(x, y, len, rot=0){

	if(random() < 0.5){
		drawArc(x, y, len, rot);
		drawArc(x, y, len, rot+180);
	}else{
		const nLen = len / 2;
		for(let r=0; r<2; r++){
			for(let c=0; c<2; c++){
				const nX = -nLen/2 + x + c * nLen;
				const nY = -nLen/2 + y + r * nLen;
				const rot = floor(random(4)) * 90;
				drawArc(nX, nY, nLen, rot);
				drawArc(nX, nY, nLen, rot+180);
			}
		}
	}
}

function drawArc(x, y, len, rot){

	const rings = floor(len / 10);
	const sX = -len/2;
	const sY = -len/2;

	push();
	translate(x, y);
	rotate(rot);
	//circle(sX, sY, 5);
	//fill(getColor(COLORS)); noStroke();
	//square(0, 0, len)
	for(let i=0; i<rings; i++){
		const dia = (len*2/rings) * (rings-i);
		if(random() < 0.4){
			fill(getColor(COLORS)); stroke(BLACK);
		}else{
			fill(WHITE); stroke(BLACK);
		}
		arc(sX, sY, dia, dia, 0, 90);
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