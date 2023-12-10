"use strict"

// 参考にさせていただいたサイト
// https://qiita.com/reona396/items/95812b213910c007154f
// https://sites.google.com/site/cinderellajapan/huanocg/huano-qu-xian

const COLORS = ["#FFE5EC", "#FFC2D1", "#FFB3C6", "#FF8FAB", "#FB6F92"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
	noSmooth();
}

function draw(){
	background(33);

	const len = 80;
	const rows = floor(height / len) + 2;
	const cols = floor(width / len) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = len * c;
			let y = len * r;
			if(r%2==0) x += len / 2;
			let rdm = random(0.4, 0.5);
			drawSakura(x, y, len*rdm);
		}
	}

	for(let i=0; i<rows*cols/8; i++){
		let x = random(width);
		let y = random(height);
		let rdm = random(0.4, 0.5);
		drawSakura(x, y, len*rdm, false);
	}
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