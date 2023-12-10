"use strict"

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
	noSmooth();
}

function draw(){
	background("white");

	fill("blue");
	stroke("green");
	strokeWeight(10);
	circle(width/2, height/2, 100);
}