"use strict"

const WHITE = "#336699";
const BLACK = "#333366";
let size = 32;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); noLoop();
	fill(WHITE); noStroke();

	// Size of unit
	//size = min(width, height) / 30;
}

function draw(){
	background(BLACK);

	const rows = floor(height / size);
	const cols = floor(width / size);
	const sX = width/2 - cols*size/2;
	const sY = height/2 - rows*size/2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = sX + c * size;
			const y = sY + r * size;
			circle(x, y, size);
			const rdm = random();
			if(rdm < 0.2){
				square(x, y-size/2, size);
			}else if(rdm < 0.4){
				square(x-size/2, y, size);
			}
		}
	}
}