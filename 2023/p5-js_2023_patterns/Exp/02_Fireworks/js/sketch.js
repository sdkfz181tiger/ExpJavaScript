"use strict"

const COLORS = ["#F6BD60", "#F7EDE2", "#F5CAC3", "#84A59D", "#F28482"];
const WHITE = "#FFFFFF";
const BLACK = "#333333";

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
	strokeCap(PROJECT);

	//noFill();
	//stroke(WHITE); strokeWeight(1);

	const len = 120;
	const rows = floor(height / len);
	const cols = floor(width / len);
	const total = rows * cols * 2;

	for(let i=0; i<total; i++){

		const rdm = random();
		if(0.8 < rdm){
			drawRing(random(width), random(height), 120, random(360));
		}else if(0.6 < rdm){
			fill(getColor(COLORS));
			circle(random(width), random(height), random(50, 90));
		}else if(0.2 < rdm){
			drawKanoko(random(width), random(height), 10, random(360));
		}else{
			const multiple = floor(random(2, 5));
			drawFireworks(random(width), random(height), 
				10, 6, multiple, random(360));
		}
	}
}

function drawRing(x, y, len, rot=0){

	push();
	translate(x, y);
	rotate(rot);
	drawLeaf(0, len/2);
	drawLeaf(90, len/2);
	drawLeaf(180, len/2);
	drawLeaf(270, len/2);
	pop();
}

function drawLeaf(r, len){

	fill(getColor(COLORS));
	noStroke();

	rotate(r);
	beginShape();
	for(let i=0; i<90; i+=2){
		const x = len * cos(i);
		const y = len * sin(i);
		vertex(x, y);
	}
	for(let i=180; i<270; i+=2){
		const x = len * cos(i) + len;
		const y = len * sin(i) + len;
		vertex(x, y);
	}
	endShape();
}

function drawKanoko(x, y, len, rot=0){

	push();
	translate(x, y);
	rotate(rot);

	const pX = len * cos(45);
	const pY = len*2 * sin(45);

	for(let r=0; r<2; r++){
		for(let c=0; c<9; c++){
			let x = pX * c;
			let y = pY * r;
			if(c%2==0) y -= pY / 2;
			push();
			translate(x, y);
			rotate(45);
			fill(WHITE);
			square(0, 0, len*0.6, len*0.1);
			fill(BLACK);
			square(0, 0, len*0.2, len*0.05);
			pop();
		}
	}
	pop();
}

function drawFireworks(x, y, fireW, fireH, multiple, rot=0){

	fill(getColor(COLORS));
	noStroke();

	const total = 12;
	const pD = floor(360 / total);
	const rad = fireW * 1.5;

	push();
	translate(x, y);
	rotate(rot);

	for(let i=0; i<total; i++){
		const off = (i%2==0) ? 0:rad/2;
		const x = (rad+off) * cos(pD*i);
		const y = (rad+off) * sin(pD*i);
		const m = (i%2==0) ? multiple:multiple-1;
		drawFire(x, y, fireW, fireH, m, pD*i);
	}
	pop();
}

function drawFire(x, y, fireW, fireH, multiple, rot){

	push();
	translate(x, y);
	rotate(rot);
	for(let m=0; m<multiple; m++){
		const x = m * fireW * 1.5;
		ellipse(x, 0, fireW, fireH);
	}
	pop();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}