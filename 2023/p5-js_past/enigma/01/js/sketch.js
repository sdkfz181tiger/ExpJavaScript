
const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rotA = [1,8,20,16,7,19,24,0,11,13,22,2,5,12,14,3,15,4,23,25,17,18,21,6,9,10];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER);
	noLoop();
	noSmooth();
}

function draw(){
	background(0);

	const cX = width / 2;
	const cY = height / 2;
	const diameter = (width<height)?width/2:height/2;
	const radius = diameter / 2;
	const pad = 360 / ALPHABETS.length;
	drawRoter(cX, cY, radius, pad, rotA);
}

function drawRoter(cX, cY, radius, pad, rot){

	noFill();
	stroke(255);
	strokeWeight(1);
	circle(cX, cY, radius*2);

	const poses = [];
	for(let i=0; i<360; i+=pad){
		const x = cX + radius * cos(i);
		const y = cY + radius * sin(i);
		poses.push({x:x, y:y});
		fill(255);
		noStroke();
		circle(x, y, 8);
	}

	const pC = {x: cX, y: cY};
	for(let i=0; i<rot.length; i+=2){
		const a = poses[rot[i]];
		const b = poses[rot[i+1]];
		connectLine(a, b, pC, radius/2);
		drawAlphabet(pC, radius*1.2, pad, i);
		drawAlphabet(pC, radius*1.2, pad, i+1);
	}
}

function connectLine(a, b, pC, len){
	noFill();
	stroke(255);
	const dA = atan2(a.y-pC.y, a.x-pC.x);
	const tA = {x: pC.x+len*cos(dA), y: pC.y+len*sin(dA)};
	const dB = atan2(b.y-pC.y, b.x-pC.x);
	const tB = {x: pC.x+len*cos(dB), y: pC.y+len*sin(dB)};
	bezier(a.x, a.y, tA.x, tA.y, tB.x, tB.y, b.x, b.y);
}

function drawAlphabet(pC, len, pad, i){
	fill(255);
	noStroke();
	const x = pC.x + len * cos(pad*i);
	const y = pC.y + len * sin(pad*i);
	const alphabet = ALPHABETS[i];
	text(alphabet, x, y);
}