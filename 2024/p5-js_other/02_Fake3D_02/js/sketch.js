"use strict"

// URL: https://openprocessing.org/sketch/957775

const WHITE = "#ffffff";
const BLACK = "#000000";

const SCREEN  = 80; // スクリーンまでの距離
const R_WIDTH = 780;// 道の横幅
const R_DEPTH = 10; // 道の奥行

const lines = [];// ラインオブジェクトを格納する配列

let eyeX = 0;  // 視線の座標
let eyeY = 400;
let eyeZ = 0;

function setup(){
	//createCanvas(windowWidth, windowHeight);
	createCanvas(480, 320);
	angleMode(DEGREES); noLoop();
	noFill();
	stroke(WHITE); strokeWeight(1);

	// ラインオブジェクトを用意
	for(let i=0; i<100; i++){
		const line = new MyLine();
		line.project(eyeX, eyeY, R_DEPTH*i-eyeZ);
		lines.push(line);
	}
}

function draw(){
	background(BLACK);
	
	// キャンバスに描画する
	for(let i=0; i<80; i++){
		const lA = lines[i];
		lA.project(eyeX, eyeY, R_DEPTH*i-eyeZ);
		line(lA.x-lA.w/2, lA.y, lA.x+lA.w/2, lA.y);
	}

	saveCanvas("test.png");
}

// ラインオブジェクト(台形の横線で使う)
class MyLine{

	constructor(){
		this._x = 0;
		this._y = 0;
		this._w = 0;
		this._c = 0;
		this._b = 0;
	}

	project(x, y, z){// 2D空間の座標に変換
		const s = SCREEN / z;
		this._x = x*s + width/2;
		this._y = y*s + height/2;
		this._w = R_WIDTH * s;
	}

	get x(){return this._x;}
	get y(){return this._y;}
	get w(){return this._w;}

	set curve(n){this._c = n;}
	get curve(){return this._c;}

	set bank(n){this._b = n;}
	get bank(){return this._b;}
}