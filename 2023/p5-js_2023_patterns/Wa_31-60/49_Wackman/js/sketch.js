"use strict"

const COLOR_R = ["#F7B267", "#F79D65", "#F4845F", "#F27059", "#F25C54"];
const COLOR_G = ["#243010", "#87a330", "#a1c349", "#cad593", "#2a3c24"];
const COLOR_B = ["#2f6690", "#3a7ca5", "#d9dcd6", "#16425b", "#81c3d7"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

let enemyR, enemyG, enemyB;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();

	const len = 180;
	enemyR = new Enemy(len, COLOR_R);
	enemyG = new Enemy(len, COLOR_G);
	enemyB = new Enemy(len, COLOR_B);
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	stroke(WHITE); strokeWeight(1);

	enemyR.draw(width/2, height/2);
	enemyG.draw(width/2 + 200, height/2);
	enemyB.draw(width/2 - 200, height/2);
}

class Enemy{

	constructor(len, colors){
		this._len = len;
		this._colors = colors;
		this._txr = createGraphics(len, len);
		this._txr.angleMode(DEGREES);
		this._txr.background(getColor(this._colors));
		this._txr.noFill(); this._txr.noStroke();
		this._mask = createGraphics(len, len);
		this._mask.angleMode(DEGREES);
		//this._mask.background(getColor(this._colors));
		//this._mask.noFill(); this._txr.noStroke();
	}

	getTexture(){

		const w = this._txr.width;
		const h = this._txr.height;
		this._txr.push();
		this._txr.translate(0, 0);

		for(let i=0; i<100; i++){
			const x = random(w);
			const y = random(h);
			const l = random(w*0.3);
			this._txr.fill(getColor(this._colors));
			this._txr.circle(x, y, l);
		}

		this._txr.pop();
		return this._txr.get();
	}

	getMask(){

		const rad = this._len / 2;
		const l   = rad / 2;
		const r2  = sqrt(2);
		const points = [
			{d:90,  l:l*2}, {d:225, l:l*r2}, {d:135, l:l*r2},
			{d:225, l:l*r2},{d:135, l:l*r2}];
		this._mask.push();
		this._mask.translate(this._len/2, this._len/2);
		this._mask.beginShape();
		dotArc(0, 0, rad, 180, 180);
		dotShape(rad, 0, points);
		this._mask.endShape(CLOSE);
		this._mask.pop();
		return this._mask.get();
	}

	draw(x, y){
		const img = this.getTexture();
		img.mask(this.getMask());
		image(img, x, y);
		fill(255); noStroke();
		const len = this._len;
		ellipse(x-len*0.16, y-len*0.18, len*0.25, len*0.35);
		ellipse(x+len*0.16, y-len*0.18, len*0.25, len*0.35);
		fill(33);
		ellipse(x-len*0.14, y-len*0.18, len*0.12, len*0.15);
		ellipse(x+len*0.18, y-len*0.18, len*0.12, len*0.15);
	}
}

function dotArc(x, y, rad, from, progress, clockwise=true){
	for(let i=0; i<=progress; i+=3){
		const d = clockwise ? from+i:from-i;
		vertex(x+rad*cos(d), y+rad*sin(d));
	}
}

function dotShape(x, y, points){
	const current = {x: x, y: y};
	for(let point of points){
		current.x += point.l * cos(point.d);
		current.y += point.l * sin(point.d);
		vertex(current.x, current.y);
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}