"use strict"

const C_HEAD   = [
	"#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
	"#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF",
	"#0081A7", "#00AFb9", "#FDFCDC", "#FED9B7", "#F07167"];
const C_BODY   = ["#386641", "#6A994E", "#A7C957"];
const C_CENTER = ["#FFBF69", "#FF9F1C", "#F4D35E"];
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

	stroke(WHITE); strokeWeight(1);

	push();
	translate(width/2, height/2);
	rotate(20);
	const len = 60;
	const pX = len*3 + len*0.2;
	const pY = len*4;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=-rows; r<rows; r++){
		for(let c=-cols; c<cols; c++){
			let x = c * pX;
			let y = r * pY;
			if(c%2==0) y += len*2;
			const rdm = (random()<0.85) ? 0:180;
			drawFlower(x, y, len, rdm);
		}
	}
	const pX2 = len*3 + len*0.2;
	const pY2 = len*2;
	const rows2 = floor(height / pY) + 2;
	const cols2 = floor(width / pX) + 2;
	for(let r=-rows2; r<rows2; r++){
		for(let c=-cols2; c<cols2; c++){
			let x = c * pX2 - pX2/2;
			let y = r * pY2;
			drawFlower(x, y, len/2);
		}
	}
	pop();
}

function drawFlower(x, y, len, rot=0){

	push();
	translate(x, y);
	rotate(rot);
	if(random() < 0.8){
		drawFlowerHead(0, -len, len);
	}else{
		drawFlowerBody(0, -len, len);
	}
	drawFlowerBody(0, +len, len);
	pop();
}

function drawFlowerHead(x, y, len){

	fill(getColor(C_HEAD)); noStroke();
	push();
	translate(x, y);
	circle(0, 0, 5);
	square(-len/2, -len/2, len, len/2, len/2, 0, len/2);
	square(+len/2, -len/2, len, len/2, len/2, len/2, 0);
	square(-len/2, +len/2, len, len/2, 0, len/2, len/2);
	square(+len/2, +len/2, len, 0, len/2, len/2, len/2);
	fill(getColor(C_CENTER)); noStroke();
	circle(0, 0, len*0.7);
	pop();
}

function drawFlowerBody(x, y, len){

	push();
	translate(x, y);
	//circle(0, 0, 5);
	for(let r=0; r<2; r++){
		for(let c=0; c<2; c++){
			const x = c * len - len/2;
			const y = r * len - len/2;
			fill(getColor(C_BODY)); noStroke();
			if(c%2==0){
				square(x, y, len*0.95, 0, len/2, 0, len/2);
			}else{
				square(x, y, len*0.95, len/2, 0, len/2, 0);
			}
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