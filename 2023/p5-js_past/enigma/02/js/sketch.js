"use strict";

const scrambler = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER);
	noLoop();
	noSmooth();

	const cX  = width / 2;
	const cY  = height / 2;
	const rad = (width<height)?width*0.3:height*0.3;
	const roterA = new Roter(cX-rad*2.5, cY, rad, ROT_A);
	const roterB = new Roter(cX, cY, rad, ROT_B);
	const roterC = new Roter(cX+rad*2.5, cY, rad, ROT_C);
	scrambler.push(roterA);
	//scrambler.push(roterB);
	//scrambler.push(roterC);
}

function draw(){
	background(0);
	// Roter
	for(let roter of scrambler) roter.drawRoter();
	decode("A", "blue");
}

function decode(alphabet, color){
	console.log("decode:", alphabet);
	// Forward
	let a = alphabet;
	for(let roter of scrambler){
		a = roter.decode(a, color);
		console.log("->", a);
	}
	// TODO: reflector
	// TODO: backward
}

function mousePressed(){

	// Scrambler
	for(let i=scrambler.length-1; 0<=i; i--){
		if(!scrambler[i].rotate()) break;
	}
	draw();
}