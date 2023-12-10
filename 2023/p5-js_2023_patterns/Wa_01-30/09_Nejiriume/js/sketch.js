"use strict"

const COLORS = ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"];
const WHITE = "#FFFFFF";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(WHITE);

	const w = 80;
	const rows = floor(height / w) + 2;
	const cols = floor(width / w) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * w;
			let y = r * w;
			if(r%2==0) x += w / 2;
			drawUme(x, y, w / 3);
		}
	}
}

function drawHeart(x, y){
	beginShape();
	translate(x, y);
	for(let i=0; i<360; i++){
		const x = 12*sin(i) - 4*sin(i*3);
		const y = 13*cos(i) - 5*cos(i*2) - 2*cos(i*3) - cos(i*4);
		vertex(x, -y);
	}
	endShape();
}

function drawUme(x, y, dia){
	fill(getColor());
	noStroke();

	const oD = floor(360 / 5);
	push();
	translate(x, y);
	for(let i=0; i<5; i++){
		const x = dia/2 * cos(oD * (i+1));
		const y = dia/2 * sin(oD * (i+1));
		circle(x, y, dia);
	}
	pop();

	noFill();
	stroke(WHITE); strokeWeight(dia*0.1);

	push();
	translate(x, y);
	for(let i=0; i<5; i++){
		const x = dia/2 * cos(oD * (i+1));
		const y = dia/2 * sin(oD * (i+1));
		const start = -100 + i*oD;
		const end = start + 240;
		arc(x, y, dia, dia, start, end);
	}
	fill(getColor());
	circle(0, 0, dia*0.45);
	pop();
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}