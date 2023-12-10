"use strict"

const COLORS = ["#463F3A", "#8A817C", "#BCB8B1", "#F4F3EE", "#E0AFA0"];
const WHITE  = "#EEEEEE";
const BLACK  = "#333333";

let img, drawer1, drawer2;

function preload(){
	img = loadImage("photo.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); imageMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	frameRate(24);

	// Image
	let imgW = width;
	let imgH = height;
	if(width < height){
		imgW = imgH * (img.width / img.height);
	}else{
		imgH = imgW * (img.height / img.width);
	}
	img.resize(imgW, imgH);
	// Drawer
	drawer1 = new Drawer(width/2, height/2, 20, 0, img);
	drawer2 = new Drawer(width/2, height/2, 25, 0, img);
}

function draw(){
	noFill();
	noStroke();

	drawer1.draw();
	drawer2.draw();
}

class Drawer{

	constructor(x, y, rad, deg, img){
		this._x   = x;
		this._y   = y;
		this._img = img;
		this._rad = rad;
		this._deg = deg;
	}

	draw(){

		const x = this._x + this._rad * cos(this._deg);
		const y = this._y + this._rad * sin(this._deg);
		fill(this._img.get(x, y)); noStroke();
		circle(x, y, 3);

		this._deg += 90 / 24;
		if(360 < this._deg){
			this._rad += 10;
			this._deg -= 360;
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