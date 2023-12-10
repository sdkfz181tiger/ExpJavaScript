"use strict";

//==========
// 迷路
// 穴掘り法(シンプルにしてあります)

const C_SIZE = 320;// キャンバスの大きさ
const ROWS   = 15; // 迷路の大きさ(奇数行数)
const COLS   = 15; // 迷路の大きさ(奇数列数)

const M_ROAD = 0;  // 道
const M_WALL = 1;  // 壁

// 迷路の配列
const maze   = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_WALL));
const roads  = [];　// 道データ(描画用)
let canvas, ctx, size;// キャンバス,コンテキスト,ブロックサイズ

window.onload = ()=>{
	console.log("onload");

	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = C_SIZE;
	canvas.height = C_SIZE;
	// Context
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, C_SIZE, C_SIZE);
	// ブロックサイズ
	size = Math.floor((ROWS<=COLS)?C_SIZE/COLS:C_SIZE/ROWS);

	createMaze();// 迷路生成
}

function createMaze(){

	// 1, 開始位置を決める(行奇数,列奇数)
	const r = Math.floor(Math.random()*((ROWS-2)/2))*2+1;
	const c = Math.floor(Math.random()*((COLS-2)/2))*2+1;
	maze[r][c] = M_ROAD;
	roads.push({r:r, c:c});// 道を記録する
	extendRoad(r, c);// 穴掘り法を開始する

	drawMaze();// 迷路を描画する
}

function extendRoad(r, c){
	console.log("extendRoad:", r, c);

	const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	// 要素が少ないのでlengthを使う
	for(let i=dirs.length-1; 0<i; i--){
		const tmp = dirs[i];
		const rdm = Math.floor(Math.random()*dirs.length);
		dirs[i] = dirs[rdm];
		dirs[rdm] = tmp;
	}

	for(let dir of dirs){
		const oR = dir[0];
		const oC = dir[1];
		if(r+oR<1 || ROWS-1<=r+oR) continue;        // 上下枠である場合
		if(c+oC<1 || COLS-1<=c+oC) continue;        // 左右枠である場合
		if(maze[r+oR][c+oC] == M_ROAD) continue;    // 1歩通路である場合
		if(maze[r+oR*2][c+oC*2] == M_ROAD) continue;// 2歩通路である場合
		maze[r+oR][c+oC]     = M_ROAD;   // 1歩道にする
		maze[r+oR*2][c+oC*2] = M_ROAD;   // 2歩道にする
		roads.push({r:r+oR,   c:c+oC});  // 道を記録する
		roads.push({r:r+oR*2, c:c+oC*2});// 道を記録する
		extendRoad(r+oR*2, c+oC*2);      // 再起処理
	}
}

function drawMaze(){
	// 迷路の描画開始位置
	const oX = C_SIZE/2 - COLS*size/2;
	const oY = C_SIZE/2 - ROWS*size/2;
	// 迷路を描画する
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_ROAD) continue;
			const x = Math.floor(oX + c * size);
			const y = Math.floor(oY + r * size);
			ctx.fillStyle = "silver";
			ctx.fillRect(x, y, size-1, size-1);
		}
	}
	// 番号を描画する
	for(let i=0; i<roads.length; i++){
		const road = roads[i];
		const x = oX + road.c * size;
		const y = oY + road.r * size;
		drawText(i, x, y);
	}
}

function drawText(text, x, y){
	ctx.fillStyle = "white";
	ctx.font      = "12px Arial";
	ctx.textAlign = "center";
	ctx.fillText(text, x+size/2, y+size-4);
}