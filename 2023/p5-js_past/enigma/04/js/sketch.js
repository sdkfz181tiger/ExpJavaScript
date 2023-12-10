"use strict";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?,._ ";
const ROT_A = [28,31,1,8,20,16,7,19,24,0,11,13,22,2,5,29,30,12,14,3,15,4,23,25,17,18,21,6,9,10,26,27];
const ROT_B = [26,27,28,29,4,3,18,19,11,9,25,24,17,23,12,14,13,21,5,15,16,2,10,22,20,0,1,8,7,6,30,31];
const ROT_C = [28,3,19,9,26,29,30,31,18,21,2,7,14,13,5,6,23,15,20,4,12,11,22,25,1,10,0,16,8,17,24,27];

let scrambler;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER, CENTER); textSize(14);
	frameRate(4);
	noSmooth();

	const cX  = width / 2;
	const cY  = height / 2;
	const rad = width*0.15;
	scrambler = new Scrambler(cX, cY, rad, "HELLO NICE TO MEET YOU MY NAME IS ENIGMA! HOW ARE YOU?");
}

function draw(){
	background(33);
	scrambler.drawRoters();// Draw
}