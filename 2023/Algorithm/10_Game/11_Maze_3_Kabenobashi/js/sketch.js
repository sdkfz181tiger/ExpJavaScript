"use strict";

//==========
// 迷路
// 03_壁伸ばし法

const C_SIZE = 800;// キャンバスの大きさ
const ROWS   = 49; // 迷路の大きさ(奇数行数)
const COLS   = 49; // 迷路の大きさ(奇数列数)

const M_ROAD = 0;  // 道
const M_WALL = 1;  // 壁

// 迷路の配列
const maze   = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_WALL));
const points = [];// 壁を伸ばす起点
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

	// 1, 外枠1マス以外を道にする
	for(let r=1; r<ROWS-1; r++){
		for(let c=1; c<COLS-1; c++){
			maze[r][c] = M_ROAD;
		}
	}
	drawFrame();// 外枠を描画

	// 2, rとcが共に奇数である箇所を洗い出す
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(r%2 != 0 || c%2 != 0) continue;
			if(maze[r][c] == M_WALL) continue;
			points.push({r:r, c:c});// 壁を伸ばす起点
		}
	}

	// 3, 起点をシャッフルする
	for(let i=points.length-1; 0<=i; i--){
		const tmp = points[i];
		const rdm = Math.floor(Math.random() * i);
		points[i] = points[rdm];
		points[rdm] = tmp;
	}

	// 4, 起点が無くなるまで壁を伸ばしていく
	for(let point of points) extendWall(point.r, point.c, []);
}

function extendWall(r, c, walls){
	if(isEnd(walls)) {// 自分の壁に囲まれている場合はやりなおす
		extendWall(walls[0].r, walls[0].c, []);
		return;
	}

	if(maze[r][c] == M_WALL) return;
	walls.push({r:r, c:c});
	//console.log("extendWall:", r, c, "walls:", walls);

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
		if(isWall(r+oR*2, c+oC*2, walls)) continue;// 自分の壁である場合
		if(maze[r+oR][c+oC] != M_ROAD) continue;// 1歩通路でない場合
		if(maze[r+oR*2][c+oC*2] == M_ROAD){// 2歩通路である場合
			walls.push({r:r+oR, c:c+oC});
			extendWall(r+oR*2, c+oC*2, walls);// 2歩目から再帰処理
			return;
		}
		// 壁に接続する
		walls.push({r:r+oR, c:c+oC});
		for(let wall of walls) maze[wall.r][wall.c] = M_WALL;// 壁を確定させる
		drawWall(walls);// 壁を描画する
		return;
	}
}

function isEnd(walls){
	if(walls.length <= 0) return false;
	const last = walls[walls.length-1];
	let cnt = 0;
	if(isWall(last.r-2, last.c, walls)) cnt++;
	if(isWall(last.r+2, last.c, walls)) cnt++;
	if(isWall(last.r, last.c-2, walls)) cnt++;
	if(isWall(last.r, last.c+2, walls)) cnt++;
	return 4 <= cnt;// 4方向に壁がある(行き止まり)
}

function isWall(r, c, walls){
	if(walls.length <= 0) return false;
	for(let wall of walls){
		if(wall.r==r && wall.c==c) return true;
	}
	return false;
}

function drawFrame(){
	// 迷路の描画開始位置
	const oX = C_SIZE/2 - COLS*size/2;
	const oY = C_SIZE/2 - ROWS*size/2;
	// 外枠を描画する
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_ROAD) continue;
			const x = Math.floor(oX + c * size);
			const y = Math.floor(oY + r * size);
			ctx.fillStyle = "silver";
			ctx.fillRect(x, y, size-1, size-1);
		}
	}
}

function drawWall(walls){
	// 迷路の描画開始位置
	const oX = C_SIZE/2 - COLS*size/2;
	const oY = C_SIZE/2 - ROWS*size/2;
	// 壁を描画する
	const r = Math.floor(Math.random() * 156) + 100;
	const g = Math.floor(Math.random() * 156) + 100;
	const b = Math.floor(Math.random() * 156) + 100;
	const color = r.toString(16) + g.toString(16) + b.toString(16);
	for(let i=0; i<walls.length; i++){
		const wall = walls[i];
		const x = Math.floor(oX + wall.c * size);
		const y = Math.floor(oY + wall.r * size);
		ctx.fillStyle = "#" + color;
		ctx.fillRect(x, y, size-1, size-1);
		drawText(i, x, y);// Text
	}
}

function drawText(text, x, y){
	ctx.fillStyle = "black";
	ctx.font      = "12px Arial";
	ctx.textAlign = "center";
	ctx.fillText(text, x+size/2, y+size-4);
}