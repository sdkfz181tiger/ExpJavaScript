"use strict"

// URL: https://openprocessing.org/sketch/957775

const WHITE = "#ffffff";
const BLACK = "#000000";

const S_DIST  = 80; // スクリーンまでの距離
const R_WIDTH = 780;// 道の幅
const R_DEPTH = 12; // 道の奥行き

const lines = [];// ラインオブジェクトを格納する配列
let posY, posZ;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); frameRate(60);
	//fill(WHITE); noStroke();
	stroke(WHITE); strokeWeight(1);

	// 位置を初期化
	posY = 400;
	posZ = 0;
	// ラインオブジェクト
	for(let i=0; i<300; i++){
		const line = new MyLine();
		line.project(0, posY, R_DEPTH*i);
		lines.push(line);
		// 50~100までは左カーブ
		if(50 <= i && i < 100){
			line.curve = 1.8;
			line.bank  = 0.8;
		}
		// 100~150までは右カーブ
		if(100 <= i && i < 150){
			line.curve = -1.8;
			line.bank  = 0.8;
		}
		// 150~200までは左カーブ
		if(150 <= i && i < 200){
			line.curve = 1.8;
			line.bank  = -0.8;
		}
		// 200~250までは右カーブ
		if(200 <= i && i < 250){
			line.curve = -1.8;
			line.bank  = -0.8;
		}
	}
}

function draw(){
	background(BLACK);

	posZ += 4;// z位置を更新

	// カーブ
	let oX = 0;
	let dX = 0;
	// 坂
	let oY = 0;
	let dY = 0;

	// Linesを2D画面に描画する
	const start = floor(posZ/R_DEPTH) + 1;
	for(let i=start; i<start+40; i++){
		const iA = i % lines.length;
		const iB = (0<iA) ? iA-1:lines.length-1;
		const lA = lines[iA];
		const lB = lines[iB];

		oX += dX;
		dX += lA.curve;// 次に描画するカーブの差分

		oY += dY;
		dY += lA.bank;// 次に描画するバンクの差分

		// 2D画面に変換する
		lA.project(-oX, posY-oY, R_DEPTH*i-posZ);

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

function drawLine(lA){
	noFill(); stroke(WHITE);
	line(lA.x-lA.w/2, lA.y, lA.x+lA.w/2, lA.y);
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
		const s = S_DIST / (S_DIST+z);
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