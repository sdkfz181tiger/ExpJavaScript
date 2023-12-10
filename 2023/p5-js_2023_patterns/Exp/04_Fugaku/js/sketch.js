"use strict"

const COLORS = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
const WHITE = "#FFFFFF";
const BLACK = "#333333";

let img;

let colorStr = "";

function preload(){

	img = loadImage("sample.jpg");
}

function setup(){
	createCanvas(img.width, img.height);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	image(img, 0, 0);

	// const pad  = 5;
	// const rows = floor(height / pad) + 1;
	// const cols = floor(width / pad) + 1;
	// for(let r=0; r<rows; r++){
	// 	for(let c=0; c<cols; c++){
	// 		const x = c * pad;
	// 		const y = r * pad;

	// 		const pixel = get(x, y);
	// 		fill(pixel);

	// 		colorStr += getColorStr(pixel);
			
	// 		square(x, y, pad);
	// 	}
	// }
	// console.log(colorStr);
}

function getColorStr(pixel){
	let r = pixel[0].toString(16);
	let g = pixel[1].toString(16);
	let b = pixel[2].toString(16);
	if(r.length < 2) r = "0" + r;
	if(g.length < 2) g = "0" + g;
	if(b.length < 2) b = "0" + b;
	return r + g + b + ",";
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}