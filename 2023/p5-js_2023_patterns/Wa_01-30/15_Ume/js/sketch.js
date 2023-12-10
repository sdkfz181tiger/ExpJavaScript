"use strict"

const COLORS = ["#FFE5EC", "#FFC2D1", "#FFB3C6", "#FF8FAB", "#FB6F92"];
const COLOR_A = "#F2E9E4";
const COLOR_B = "#BC6C25";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(COLOR_A);

	const len = 100;
	const rows = floor(height / len) + 2;
	const cols = floor(width / len) + 2;
	const buf = len * 0.05;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * len + random(-buf, buf);
			let y = r * len + random(-buf, buf);
			if(r%2==0) x += len / 2;
			drawUme(x, y, len*0.25);
		}
	}
}

function drawUme(x, y, len){

	strokeWeight(len*0.14);

	const n = 5;
	const o = 360 / n;

	push();
	translate(x, y);
	rotate(random(360));
	beginShape();

	for(let i=0; i<n; i++){
		const rdm = random(0.7, 1.0);
		const l = len * rdm;
		const x = l * cos(o*i);
		const y = l * sin(o*i);
		stroke(COLOR_B);
		line(0, 0, x, y);
		fill(getColor());
		noStroke();
		circle(x, y, l);
	}

	endShape();
	pop();
}

function drawSakura(x, y, len, single=true){
	const c = getColor();
	fill(c);
	stroke(c); strokeWeight(len*0.05);

	push();
	translate(x, y);
	rotate(random(360));
	beginShape();
	const max = (single) ? 360:75;
	for(let i=0; i<max; i+=2){
		const num = calcR(i) + 2 * calcH(calcR(i));
		const x = len * num * cos(i);
		const y = len * num * sin(i);
		vertex(x, y);
	}
	endShape();
	pop();
}

function calcR(x){
	const n = 5;
	const a = n / 180 * x;
	const b = floor(a) % 2;
	const c = (-1)**b;
	const d = (a-floor(a));
	return c * d + b;
}

function calcH(x){
	const ulim = 0.8;
	if(x<ulim) return 0;
	return ulim - x;
}

function getColor(){
	return COLORS[floor(random()*COLORS.length)];
}