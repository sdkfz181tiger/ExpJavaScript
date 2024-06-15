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
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); frameRate(60);
	noFill();
	stroke(WHITE); strokeWeight(1);

	// ラインオブジェクトを用意
	for(let i=0; i<100; i++){
		const line = new MyLine();

		if(20<i && i<40){
			line.curve = 0.8;
			line.bank = 0.8;
		}
		if(40<i && i<60){
			line.curve = -0.8;
			line.bank = -0.8;
		}

		line.project(eyeX, eyeY, R_DEPTH*i-eyeZ);
		lines.push(line);
	}
}

function draw(){
	background(BLACK);

	eyeZ += 2;// 視点を前へ

	// カーブ
	let oX = 0;
	let dX = 0;
	// 坂
	let oY = 0;
	let dY = 0;
	
	// キャンバスに描画する
	const start = floor(eyeZ/R_DEPTH) + 1;
	for(let i=start; i<start+40; i++){
		const iA = i % lines.length;
		const iB = (0<iA) ? iA-1:lines.length-1;
		const lA = lines[iA];
		const lB = lines[iB];

		oX += dX;
		dX += lA.curve;// 次に描画するカーブの差分

		oY += dY;
		dY += lA.bank;// 次に描画するバンクの差分

		lA.project(eyeX-oX, eyeY-oY, R_DEPTH*i-eyeZ);

		if(lB.y < lA.y) continue;

		let cGrass = (i%2==0) ? "#33dd33":"#33aa33";
		let cSide  = (i%2==0) ? "#333333":"#ffffff";
		let cRoad  = (i%2==0) ? "#bbbbbb":"#eeeeee";

		drawShape(lA.x, lA.y, width*4,  lB.x, lB.y, width*4,  cGrass);
		drawShape(lA.x, lA.y, lA.w*1.2, lB.x, lB.y, lB.w*1.2, cSide);
		drawShape(lA.x, lA.y, lA.w,     lB.x, lB.y, lB.w,     cRoad);
	}
}

// 2つのラインオブジェクトを使って台形を描く
function drawShape(x1, y1, w1, x2, y2, w2, c){
	fill(c); noStroke();
	beginShape();
	vertex(x1-w1/2, y1);
	vertex(x1+w1/2, y1);
	vertex(x2+w2/2, y2);
	vertex(x2-w2/2, y2);
	endShape();
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
		const s = SCREEN / (SCREEN+z);
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