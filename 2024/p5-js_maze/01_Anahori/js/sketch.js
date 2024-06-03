"use strict"

const WHITE = "#eeeeee";
const BLACK = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop(); stroke(WHITE); strokeWeight(2);
}

function draw(){
	background(BLACK);
	drawMaze();
}

function drawMaze(x, y){
	
}
