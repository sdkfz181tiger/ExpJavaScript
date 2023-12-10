"use strict"

const COLORS = ["#CCDBDC", "#9AD1D4", "#80CED7", "#007EA7", "#003249"];
const WHITE  = "#FFFFFF";
const BLACK  = "#336666";
const BROWN  = "#CC9933";

let myGraphics;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();

	myGraphics = new MyGraphics(windowWidth, windowHeight);
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	myGraphics.draw();
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

class MyGraphics{

	constructor(w, h){
		this._w = w;
		this._h = h;
		this._main = createGraphics(w, h);
		this._main.angleMode(DEGREES);
		this._mask = createGraphics(w, h);
		this._mask.angleMode(DEGREES);
		this._parts = createGraphics(w, h);
		this._parts.angleMode(DEGREES);
		this.setup();
	}

	setup(){

		{
			// Main
			const dia = 30;
			const weight = dia * 0.1;
			const pX = dia;
			const pY = dia * 0.35;
			const rows = floor(this._h / pY) + 2;
			const cols = floor(this._w / pX) + 2;
			for(let r=0; r<rows; r++){
				for(let c=0; c<cols; c++){
					let x = c * pX;
					let y = r * pY;
					if(r%2==0) x += pX / 2;
					this._main.fill(WHITE);
					this._main.stroke(getColor(COLORS));
					this._main.strokeWeight(weight);
					this._main.circle(x, y, dia);
					this._main.circle(x, y, dia*0.5);
				}
			}
		}

		{
			// Mask, Parts
			const len = 120;
			const dD  = 14;
			const oD  = 2;
			const pX = len * cos((180-(dD+oD)*7)/2) * 2.4;
			const pY = len * 1.1;
			const rows = floor(height / pY) + 2;
			const cols = floor(width / pX) + 2;
			for(let r=0; r<rows; r++){
				for(let c=0; c<cols; c++){
					let x = pX * c;
					let y = pY * r;
					if(r%2==0) x -= pX / 2;
					const rot = random(-20, 20);
					drawOugi(this._mask, x, y, len, dD, oD, rot);
					drawHandle(this._parts, x, y, len, dD, oD, rot);
				}
			}
		}
	}

	draw(){
		const img = this._main.get();
		img.mask(this._mask.get());
		image(img, this._w/2, this._h/2);
		const imgParts = this._parts.get();
		image(imgParts, this._w/2, this._h/2);
	}
}

function drawOugi(grx, x, y, len, dD, oD, rot=0){

	const pD = dD + oD;
	const sD = 180 + (180-pD*7)/2;

	grx.push();
	grx.translate(x, y);
	grx.rotate(rot);

	grx.fill(WHITE);
	for(let i=0; i<7; i++){
		const start = sD + pD*i;
		const end = start + dD;
		grx.arc(0, 0, len*2, len*2, start, end);
	}
	grx.pop();
}

function drawHandle(grx, x, y, len, dD, oD, rot=0){

	const pD = dD + oD;
	const sD = 180 + (180-pD*7)/2;

	grx.push();
	grx.translate(x, y);
	grx.rotate(rot);

	grx.fill(BLACK);
	grx.arc(0, 0, len*0.9, len*0.9, sD, sD+pD*7-oD);
	grx.fill(BROWN);
	for(let i=0; i<7; i++){
		grx.arc(0, 0, len*0.85, len*0.85, sD+pD*i, sD+pD*i+dD);
	}
	grx.arc(0, 0, len*0.2, len*0.2, sD-180, sD+pD*7-oD-180);
	grx.pop();
}