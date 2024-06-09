"use strict";

//==========
// 経路探索処理2
// 05_A*アルゴリズム

const C_SIZE = 320;// キャンバスの大きさ
const ROWS   = 15; // 迷路の大きさ(行数)
const COLS   = 15; // 迷路の大きさ(列数)

const M_ROAD   = 0;// 道
const M_WALL   = 1;// 壁
const M_PILLAR = 2;// 柱

// 迷路の配列
const maze   = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_ROAD));
const points = [];// 探索済み
const routes = new PriorityQueue();// 探索候補

const start = {r:1, c:1, stp:0, fR:0, fC:0};// Start
const goal  = {r:ROWS-2, c:COLS-2};

// キャンバス,コンテキスト,ブロックのサイズ
let canvas, ctx, size;

window.onload = ()=>{
	console.log("onload");

	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = C_SIZE;
	canvas.height = C_SIZE;
	// Context
	ctx = canvas.getContext("2d");
	// ブロックのサイズ
	size = Math.floor((ROWS<=COLS)?C_SIZE/COLS:C_SIZE/ROWS);

	createMaze();// 迷路生成
	showMaze();  // 迷路表示

	points.push(start);   // 探索済みに追加
	routes.enqueue(start);// 探索候補に追加
	analyseMaze();        // 迷路探索
	showPoints();         // 探索済み
	showRoutes();         // 探索結果
}

function analyseMaze(){

	const route = routes.dequeue().node;// 優先度で取得

	const sR    = route.r;
	const sC    = route.c;
	const stp   = route.stp;
	//console.log("analyseMaze:", sR, sC);

	// ゴール判定
	if(sR == goal.r && sC == goal.c) return;
	
	let dirs = [
		{r:-1, c:0}, {r:1, c:0},
		{r:0, c:-1}, {r:0, c:1}
	];
	for(let dir of dirs){
		const oR = sR + dir.r;
		const oC = sC + dir.c;
		if(!isRoad(oR, oC)) continue; // 道でない
		if(isPassed(oR, oC)) continue;// 探索済みである
		const dR = goal.r - (sR+dir.r);
		const dC = goal.c - (sC+dir.c);
		const hue  = Math.abs(dR + dC);// マンハッタン距離
		const from = {r:oR, c:oC, stp:stp+1, fR:sR, fC:sC, hue:hue};
		points.push(from);// 探索済みに追加
		routes.enqueue(from, stp+1 + hue);// 探索候補に追加
	}

	if(0 < routes.size()) analyseMaze();// 再帰処理

	return;
}

function isEnd(r, c){
	if(isRoad(r-1, c) && !isPassed(r-1, c)) return false;
	if(isRoad(r+1, c) && !isPassed(r+1, c)) return false;
	if(isRoad(r, c-1) && !isPassed(r, c-1)) return false;
	if(isRoad(r, c+1) && !isPassed(r, c+1)) return false;
	return true;
}

function isRoad(r, c){
	return maze[r][c] == M_ROAD;
}

function isPassed(r, c){
	for(let point of points){
		if(r == point.r && c == point.c) return true;
	}
	return false;
}

function showPoints(){
	// 迷路の描画開始位置
	const oX = C_SIZE / 2 - COLS * size / 2;
	const oY = C_SIZE / 2 - ROWS * size / 2;
	// 探索済みを描画する
	for(let point of points){
		const x = Math.floor(oX + point.c * size);
		const y = Math.floor(oY + point.r * size);
		ctx.fillStyle = "dimgray";
		ctx.fillRect(x, y, size-1, size-1);
		drawText(point.stp, x, y);
	}
}

function showRoutes(){
	// 迷路の描画開始位置
	const oX = C_SIZE / 2 - COLS * size / 2;
	const oY = C_SIZE / 2 - ROWS * size / 2;
	// 探索結果を描画する
	let route = getRoute(goal.r, goal.c);
	while(route = getRoute(route.fR, route.fC)){
		const x = Math.floor(oX + route.c * size + size/4);
		const y = Math.floor(oY + route.r * size + size/4);
		const w = Math.floor(size/2);
		ctx.fillStyle = "orange";
		ctx.fillRect(x, y, w, w);
	}
}

function getRoute(r, c){
	for(let point of points){
		if(point.r == r && point.c == c) return point;
	}
	return null;
}

function drawText(text, x, y){
	ctx.fillStyle = "white";
	ctx.font      = "12px Arial";
	ctx.textAlign = "center";
	ctx.fillText(text, x+size/2, y+size-4);
}