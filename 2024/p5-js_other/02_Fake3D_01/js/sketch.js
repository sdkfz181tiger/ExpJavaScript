"use strict"

// URL: https://openprocessing.org/sketch/957775

const WHITE = "#ffffff";
const BLACK = "#000000";

const SCREEN = 100; // スクリーンまでの距離

const points = [];// 3D空間の座標を格納する配列

let eyeX = 0;  // 視線の座標
let eyeY = 400;
let eyeZ = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); frameRate(16);
	noFill();
	stroke(WHITE); strokeWeight(1);

	// x-z平面に10x10の点を用意する
	const pad = 30;
	for(let i=-5; i<5; i++){
		for(let j=0; j<10; j++){
			const x = i * pad;
			const y = 0;
			const z = j * pad;
			const point = {x: x, y: y, z: z}
			points.push(point);
		}
	}
}

function draw(){
	background(BLACK);
	
	// キャンバスに描画する
	for(const point of points){
		// 3D座標を2D座標に変換
		const [x, y, s] = project(point.x-eyeX, point.y+eyeY, point.z-eyeZ);
		circle(x, y, 10);
	}
}

// 3D座標を2D座標に変換する関数
function project(x, y, z){
	const s = SCREEN / (SCREEN+z);
	const _x = x*s + width/2;
	const _y = y*s + height/2;
	return [_x, _y, s];
}