"use strict";

//==========
// 迷路
// 01_棒倒し法

const C_SIZE = 320;// キャンバスの大きさ
const ROWS   = 13; // 迷路の大きさ(行数)
const COLS   = 13; // 迷路の大きさ(列数)

const M_ROAD   = 0;// 道
const M_WALL   = 1;// 壁
const M_PILLAR = 2;// 柱

// 迷路の配列
const maze = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_ROAD));

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
	createMaze();// 迷路生成
	showMaze();// 迷路表示
}

function createMaze(){
	// ブロックのサイズ
	size = Math.floor((ROWS<=COLS)?C_SIZE/COLS:C_SIZE/ROWS);
	// 1, 周囲に壁を作る
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			maze[r][c] = (r==0||c==0||r==ROWS-1||c==COLS-1)?M_WALL:M_ROAD;
		}
	}
	// 2, 周囲に壁を作る
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_WALL) continue;
			maze[r][c] = (r%2==0&&c%2==0)?M_PILLAR:M_ROAD;
		}
	}
	// 3, 柱を基準にして壁を作る
	for(let r=2; r<ROWS; r++){
		for(let c=2; c<COLS; c++){
			if(maze[r][c] == M_PILLAR){
				console.log("This is pillar!!", r, c);
				if(r==2){
					setWall(r, c, true);// 1段目の柱からは上下左右に
				}else{
					setWall(r, c, false);// 2段目の柱からは下左右のみ
				}
			}
		}
	}
}

function setWall(r, c, flg){
	const max = (flg) ? 4:3;
	const rdm = Math.floor(Math.random() * max);
	if(rdm == 0) maze[r][c-1] = 1;// 左を壁に
	if(rdm == 1) maze[r][c+1] = 1;// 右を壁に
	if(rdm == 2) maze[r+1][c] = 1;// 下を壁に
	if(rdm == 3) maze[r-1][c] = 1;// 上を壁に
}

function showMaze(){

	// 背景を描画する
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, C_SIZE, C_SIZE);

	// 迷路の描画開始位置
	const oX = C_SIZE / 2 - COLS * size / 2;
	const oY = C_SIZE / 2 - ROWS * size / 2;

	// 壁を描画する
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_ROAD) continue;
			const x = oX + c * size;
			const y = oY + r * size;
			ctx.fillStyle = "orange";
			ctx.fillRect(x, y, size-1, size-1);
		}
	}
}