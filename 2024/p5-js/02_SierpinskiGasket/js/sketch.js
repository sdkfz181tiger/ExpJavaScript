"use strict"

const WHITE = "#eeeeee";
const BLACK = "#2f6690";

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop(); noFill(); noStroke();
}

function draw(){
	background(BLACK);

	// 最初の三角形の中心座標
	const x = width / 2;
	const y = height * 0.65;

	// 最初の三角形の各頂点を求める
	const len = width<height?width*0.5:height*0.6;
	const deg = -90;
	const aX = x + len * cos(deg);// 1つ目の頂点
	const aY = y + len * sin(deg);
	const bX = x + len * cos(deg+120);// 2つ目の頂点
	const bY = y + len * sin(deg+120);
	const cX = x + len * cos(deg+240);// 3つ目の頂点
	const cY = y + len * sin(deg+240);
	const points = [[aX, aY], [bX, bY], [cX, cY]];
	drawFractal(points, 5, BLACK);// 再帰処理の開始
}

function drawFractal(points, depth, c){

	// 再帰する必要が無い場合(depthが0)は逆三角形を描画
	if(depth <= 0){
		fill(c);
		triangle(
			points[0][0], points[0][1],
			points[1][0], points[1][1],
			points[2][0], points[2][1]);
		return;// これ以上は再帰処理を行わない
	}

	// 逆三角形の頂点を求める(各辺の中間地点)
	const pA = getMid(points[0], points[1]);
	const pB = getMid(points[1], points[2]);
	const pC = getMid(points[2], points[0]);
	drawFractal([pA, pB, pC], 0, BLACK);

	drawFractal([points[0], pA, pC], depth-1, WHITE);// 上の三角形に再帰
	drawFractal([points[1], pA, pB], depth-1, WHITE);// 左の三角形に再帰
	drawFractal([points[2], pB, pC], depth-1, WHITE);// 右の三角形に再帰
}

function getMid(pA, pB){
	const x = (pA[0] + pB[0]) / 2;
	const y = (pA[1] + pB[1]) / 2;
	return [x, y];
}