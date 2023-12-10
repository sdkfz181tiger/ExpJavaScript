"use strict"

const COLORS = ["#CCDBDC", "#9AD1D4", "#80CED7", "#007EA7", "#003249"];
const WHITE  = "#FFFFFF";
const BLACK  = "#333333";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER); imageMode(CENTER);
	textAlign(CENTER, CENTER); textSize(14);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	// Graphics
	const graA = createMyGra(50, 50, WHITE);
	const img = graA.get();// Graphics -> Image
	image(img, 100, 100);// Image
}

function createMyGra(w, h, cBkg){
	// Graphics
	const gra = createGraphics(w, h);
	gra.angleMode(DEGREES);
	gra.background(cBkg);
	gra.noFill();
	gra.stroke(BLACK);
	gra.strokeWeight(1);
	for(let i=0; i<30; i++){
		const x = random(gra.width);
		const y = random(gra.height);
		const d = random(10, 30);
		gra.stroke(getColor(COLORS));
		gra.circle(x, y, d);
	}
	return gra;
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}
