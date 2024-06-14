"use strict"

// URL: https://openprocessing.org/sketch/957775

const WHITE = "#ffffff";
const BLACK = "#000000";

const S_DIST = 80; // スクリーンまでの距離

const objs = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); noLoop();
	//fill(WHITE); noStroke();
	noFill();
	stroke(WHITE); strokeWeight(1);

	const pad = 30;
	for(let i=-5; i<5; i++){
		for(let j=0; j<10; j++){
			const x = i * pad;
			const y = 200;
			const z = j * pad;
			const obj = {x: x, y: y, z: z}
			objs.push(obj);
		}
	}
}

function draw(){
	background(BLACK);
	
	for(const obj of objs){
		const [x, y, s] = project(obj);
		console.log(x, y, s);
		circle(x, y, 10);
	}
}

function project(obj){
	const s = S_DIST / (S_DIST+obj.z);
	const x = obj.x*s + width/2;
	const y = obj.y*s + height/2;
	return [x, y, s];
}