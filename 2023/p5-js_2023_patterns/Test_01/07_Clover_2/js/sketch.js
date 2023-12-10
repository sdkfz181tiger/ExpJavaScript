"use strict"

const COLORS = ["#1C7C54", "#73E2A7", "#DEF4C6", "#1B512D", "#B1CF5F"];
const WHITE  = "#FFFFFF";
const BLACK  = "#243010";

const clovers = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();

	const rad  = 30;
	const pad  = rad * 2.2;
	const rows = floor(height / pad) + 2;
	const cols = floor(width / pad) + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){ 
			let x = pad * c + random(pad*0.1);
			let y = pad * r + random(pad*0.1);
			if(r%2==0) x += pad / 2;
			const radRdm = rad * random(0.8, 1.0);
			const rot = random(360);
			const clover = new Clover(x, y, radRdm, rot, COLORS);
			clovers.push(clover);
		}
	}
}

function draw(){
	background(WHITE);
	noFill();
	noStroke();
	strokeCap(PROJECT);
	// Draw
	for(let clover of clovers) clover.draw();
}

class Clover{

	constructor(x, y, rad, rot=0, colors){

		this._x   = x;
		this._y   = y;
		this._rad = rad;
		this._w   = rad * 0.5;
		this._h   = this._w * 1.1;
		this._rot = rot;
		this._color = getColor(colors);
	}

	get x(){return this._x;}
	get y(){return this._y;}
	get rad(){return this._rad;}

	isCollide(x, y, rad){

		const dX = x - this._x;
		const dY = y - this._y;
		const dis = sqrt(dX**2 + dY**2);
		const len = rad + this._rad;
		return dis < len;
	}

	draw(){
		fill(this._color);
		noStroke();
		push();
		translate(this._x, this._y);
		rotate(this._rot);
		this.drawHeart(0, 0, this._w, this._h, 45);
		this.drawHeart(0, 0, this._w, this._h, 135);
		this.drawHeart(0, 0, this._w, this._h, -45);
		this.drawHeart(0, 0, this._w, this._h, -135);
		//noFill();
		//stroke(WHITE); strokeWeight(1);
		//circle(0, 0, this._rad*2);
		pop();
	}

	drawHeart(x, y, w, h, rot=0){
		push();
		translate(x, y);
		rotate(rot);
		beginShape();
		for(let t=0; t<360; t+=6){
			const x = w * sin(t)**3;
			const y = h * cos(t)-(h*0.3)*cos(2*t)-(h*0.1)*cos(3*t)-cos(4*t);
			vertex(x, -y-w*1.07);
		}
		endShape();
		pop();
	}
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}