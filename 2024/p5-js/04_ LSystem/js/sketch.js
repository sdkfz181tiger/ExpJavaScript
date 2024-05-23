"use strict"

const COLORS = ["#3a7ca5", "#d9dcd6", "#16425b", "#81c3d7"];
const WHITE  = "#eeeeee";
const BLACK  = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); imageMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	frameRate(32); noLoop();
}

function draw(){
	background(BLACK);
	noFill(); noStroke();

	stroke(255); strokeWeight(1);

	const x = width / 2;
	const y = height / 2;
	const len = width;
	drawFractal(x, y, len, 2);
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}

function drawFractal(x, y, len, depth){
	stroke(WHITE); noFill();

	// TODO: test
	const str = convertStr("A", depth);
	console.log("str:", str);


}

function convertStr(str, depth){
	if(depth <= 0) return str;
	let result = "";
	for(let s of str){
		if(s == "A") result += "ABA";
		else if(s == "B") result += "BBB";
	}
	return convertStr(result, depth-1);
}