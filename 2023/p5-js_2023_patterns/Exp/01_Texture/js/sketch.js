"use strict"

const COLORS = ["#CCDBDC", "#9AD1D4", "#80CED7", "#007EA7", "#003249"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

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
		this._mask = createGraphics(w, h);
		this.setup();
	}

	setup(){
		// Main
		this._main.background("orange");

		const dia = this._w / 15;
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

		// Mask
		for(let i=0; i<100; i++){
			const x = this._w * random();
			const y = this._h * random();
			this._mask.fill("white");
			this._mask.noStroke();
			this._mask.square(x, y, random(100));
		}
	}

	draw(){
		const img = this._main.get();
		img.mask(this._mask.get());
		image(img, this._w/2, this._h/2);
	}
}