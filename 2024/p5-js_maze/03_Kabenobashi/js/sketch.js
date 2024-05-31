"use strict"

const WHITE = "#eeeeee";
const BLACK = "#333333";
const RED   = "#dd6624";
const GREEN = "#24bb66";
const BLUE  = "#2f6690";

const ROWS  = 13;// 迷路の大きさ(行数)
const COLS  = 13;// 迷路の大きさ(列数)

// 迷路の配列
const maze = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_ROAD));

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); noLoop();
	fill(WHITE); noStroke();
}

function draw(){
	background(BLACK);

}

function createMaze(){

}
