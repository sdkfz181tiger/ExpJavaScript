"use strict"

const COLORS = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const WHITE  = "#EEEEEE";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CORNER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill(); noStroke();

	stroke("white"); strokeWeight(1);
	const lenW = (width*2) / (1+sqrt(5));
	drawGCH(0, 0, lenW, 0);

	stroke("yellow"); strokeWeight(1);
	const lenH = (height*2) / (1+sqrt(5));
	drawGCV(0, 0, lenH, 0);
}

function drawGCV(x, y, len, cnt){
	if(len < 5) return;
	const colors = getColorList(COLORS);

	push();
	translate(x, y);
	rotate(cnt*90);
	circle(0, 0, 5);
	//fill(colors[0]);
	square(0, 0, len);
	//fill(colors[1]);
	beginShape();
	dotArc(0, len, len, 270, 90, true);
	vertex(0, len);
	endShape(CLOSE);
	pop();

	const num  = sqrt(len**2 + (len/2)**2);
	const nRad = len/2 - len + num;
	const nRot = cnt*90 + 45;
	const nX = x + sqrt(len**2 + len**2) * cos(nRot);
	const nY = y + sqrt(len**2 + len**2) * sin(nRot);
	drawGCV(nX, nY, nRad, cnt+1);
}

function drawGCH(x, y, len, cnt){
	if(len < 5) return;
	const colors = getColorList(COLORS);

	push();
	translate(x, y);
	rotate(cnt*-90);
	circle(0, 0, 5);
	//fill(colors[0]);
	square(0, 0, len);
	//fill(colors[1]);
	beginShape();
	dotArc(len, 0, len, 180, 90, false);
	vertex(len, 0);
	endShape(CLOSE);
	pop();

	const num  = sqrt(len**2 + (len/2)**2);
	const nRad = len/2 - len + num;
	const nRot = cnt*-90 + 45;
	const nX = x + sqrt(len**2 + len**2) * cos(nRot);
	const nY = y + sqrt(len**2 + len**2) * sin(nRot);
	drawGCH(nX, nY, nRad, cnt+1);
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