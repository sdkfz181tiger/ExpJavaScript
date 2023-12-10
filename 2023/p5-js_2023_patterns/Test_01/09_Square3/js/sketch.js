"use strict"

// 榛原千代紙(Very cute chiyogami!!)
// https://museum.haibara.co.jp/products/washi/chiyogami/chiyogami

const COLORS = ["#463F3A", "#8A817C", "#BCB8B1", "#F4F3EE", "#E0AFA0"];
const WHITE  = "#EEEEEE";
const BLACK  = "#333333";

const LEN_MAX = 150;
const LEN_MIN = 50;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(WHITE);
	noFill();
	noStroke();

	push();
	translate(width/2, height/2);
	rotate(-30);

	const rows = floor(height / LEN_MAX) + 1;
	const cols = floor(width / LEN_MAX) + 1;
	for(let r=-rows; r<rows; r++){
		const list = getColorList(COLORS);
		for(let c=-cols; c<cols; c++){
			const x = c * LEN_MAX;
			const y = r * LEN_MAX;
			if(random() < 0.5){
				drawSquare1(x, y, LEN_MAX, list[0], list[1]);
			}else{
				drawSquare1(x, y, LEN_MAX, list[1], list[0]);
			}
		}
	}
	pop();
}

function drawSquare1(x, y, len, cMain, cSub){

	if(LEN_MIN < len && random() < 0.5){
		drawSquare4(x, y, len, cMain, cSub);
		return;
	}

	fill(cMain); noStroke();
	rectMode(CORNER);
	square(x, y, len);

	push();
	translate(x+len/2, y+len/2);
	rotate(45);
	fill(cSub); noStroke();
	rectMode(CENTER);
	square(0, 0, len/2*sqrt(2), len/20);

	if(random() < 0.5){
		noFill(); stroke(cMain);
		line(-len/4*sqrt(2), 0, len/4*sqrt(2), 0);
		line(0, -len/4*sqrt(2), 0, len/4*sqrt(2));
		fill(cMain); noStroke();
		ellipse(0, 0, len/5, len/18);
		ellipse(0, 0, len/18, len/5);
		fill(cSub);
		circle(0, 0, len/25);
		fill(cMain);
		circle(-len/7, 0, len/25);
		circle(+len/7, 0, len/25);
		circle(0, -len/7, len/25);
		circle(0, +len/7, len/25);
	}else{
		noFill(); stroke(cMain);
		rectMode(CENTER);
		square(0, 0, len*0.65, len/30);

		const offD = floor(random(360));
		for(let i=0; i<360; i+=45){
			const rad = len / 6 * random(0.8, 1.2);
			const x = rad * cos(i+offD);
			const y = rad * sin(i+offD);
			noFill(); stroke(cMain);
			line(0, 0, x, y);
			fill(cMain); noStroke();
			circle(x, y, len / 20);
		}
	}
	pop();
}

function drawSquare4(x, y, len, cMain, cSub){
	const rows = 2;
	const cols = 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const nX = x + c * len/cols;
			const nY = y + r * len/rows;
			drawSquare1(nX, nY, len/rows, cSub, cMain);
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