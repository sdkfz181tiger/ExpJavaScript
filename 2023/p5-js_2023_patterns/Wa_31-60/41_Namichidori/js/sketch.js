"use strict"

const COLORS = ["#05668D", "#028090", "#00A896", "#02C39A", "#F0F3BD"];
const WHITE  = "#EEEEFF";
const BLACK  = "#333333";
const BLUE   = "#003366";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLUE);
	noFill();
	noStroke();

	stroke(WHITE); strokeWeight(1);

	const len = 80;
	const pX  = len;
	const pY  = len * 0.6;
	const rows = floor(height / pY) + 2;
	const cols = floor(width / pX) + 2;
	for(let r=0; r<rows; r++){
		const rdm = floor(random(cols));
		for(let c=0; c<cols; c++){
			let x = floor(c * pX);
			let y = floor(r * pY);
			if(r%2==0) x += pX / 2;
			if(r%2==0 && rdm==c){
				drawNamichidori(x, y, len*0.5, 10, getColor(COLORS), BLUE);
			}else{
				drawWave(x, y, len, 0, getColor(COLORS), BLUE);
			}
		}
	}
}

function drawWave(x, y, len, rot, cMain, cSub){

	const from = 230;
	const to   = from + 90;

	noFill();
	stroke(cMain); strokeWeight(len*0.1);

	push();
	translate(x, y);
	rotate(rot);
	arc(0, 0, len*0.5, len*0.5, from, to);
	arc(0, 0, len, len, from, to);
	fill(cMain); noStroke();
	circle(0, 0, len*0.15);
	pop();
}

function drawNamichidori(x, y, len, rot, cMain, cSub){

	push();
	translate(x, y-len*0.6);
	rotate(rot);
	fill(cMain); noStroke();
	circle(0, -len*0.12, len*0.85);// Head
	arc(0, 0, len, len, -10, 190);// Body
	noFill(); stroke(cMain); strokeWeight(len*0.2);
	arc(0, len*0.4, len*1.35, len*1.1, 200, 340);
	fill(cSub); noStroke();
	circle(-len*0.03, -len*0.38, len*0.08);// Eye
	noFill(); stroke(cSub); strokeWeight(len*0.08);
	arc(0, len*0.05, len*0.6, len*0.6, 30, 150);
	fill(cMain); noStroke();
	triangle(0, -len*0.38, len*0.10, -len*0.65, len*0.22, -len*0.4);
	triangle(0, -len*0.40, len*0.25, -len*0.61, len*0.24, -len*0.4);
	circle(0, len*0.5, len*0.15);
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}