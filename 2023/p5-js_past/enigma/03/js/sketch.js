"use strict";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?,.";
const ROT_A = [1,8,20,16,7,19,24,0,11,13,22,2,5,12,14,3,15,4,23,25,17,18,21,6,9,10,26,27,28,29];
const ROT_B = [4,3,18,19,11,9,25,24,17,23,12,14,13,21,5,15,16,2,10,22,20,0,1,8,7,6,26,27,28,29];
const ROT_C = [18,21,2,7,14,13,5,6,23,15,20,4,12,11,22,25,1,10,0,16,8,17,24,3,19,9,26,27,28,29];

const scrambler = [];

let cryptFlg  = true;
let decoded   = "HELLO,ENIGMA!?";// Your message!!
let encoded   = "";

let cX, cY, rad;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(12);
	frameRate(8);
	noSmooth();

	cX  = width / 2;
	cY  = height / 2;
	rad = width*0.15;

	const roterA = new Roter(cX-rad*2.1, cY, rad, ALPHABETS, ROT_A);
	const roterB = new Roter(cX, cY, rad, ALPHABETS, ROT_B);
	const roterC = new Roter(cX+rad*2.1, cY, rad, ALPHABETS, ROT_C);
	scrambler.push(roterA);
	scrambler.push(roterB);
	scrambler.push(roterC);
}

function draw(){
	background(0);
	textSize(12);

	// Scrambler
	for(let i=scrambler.length-1; 0<=i; i--){
		if(!scrambler[i].rotate()) break;
	}

	// Roter
	for(let roter of scrambler) roter.drawRoter();

	if(cryptFlg){
		if(0 < decoded.length){
			encoded += exchange(decoded[0]);
			decoded = decoded.slice(1);
		}else{
			cryptFlg = !cryptFlg;
			reset();// Reset
		}
	}else{
		if(0 < encoded.length){
			decoded += exchange(encoded[0]);
			encoded = encoded.slice(1);
		}else{
			cryptFlg = !cryptFlg;
			reset();// Reset
		}
	}
	//console.log(encoded, "<->", decoded);

	fill(255);
	noStroke();
	const mark = (cryptFlg) ? " -> ":" <- ";
	const msg = decoded + mark + encoded;
	textSize(16);
	text(msg, cX, cY-width*0.2);
}

function exchange(alphabet){
	let a = alphabet;
	// Forward
	for(let i=0; i<scrambler.length; i++){
		a = scrambler[i].exchange(a, "red");
	}
	// Reflector
	a = scrambler[scrambler.length-1].reflect(a, "green");
	// Backward
	for(let i=scrambler.length-1; 0<=i; i--){
		a = scrambler[i].exchange(a, "blue");
	}
	return a;
}

function reset(){
	// Reset
	scrambler[0].reset(ALPHABETS, ROT_A);
	scrambler[1].reset(ALPHABETS, ROT_B);
	scrambler[2].reset(ALPHABETS, ROT_C);
}