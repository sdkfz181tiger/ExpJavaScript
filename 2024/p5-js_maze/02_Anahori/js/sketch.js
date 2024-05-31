"use strict"

const WHITE = "#eeeeee";
const BLACK = "#333333";
const RED   = "#dd6624";

const ROWS  = 13;// 迷路の大きさ(行数)
const COLS  = 13;// 迷路の大きさ(列数)

const M_ROAD = 0;// 道
const M_WALL = 1;// 壁

// 迷路の配列
const maze  = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_WALL));
const roads = [];// 道データ(描画用)

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); noLoop();
	fill(WHITE); noStroke();
}

function draw(){
	background(BLACK);

	createMaze();// 迷路を作る
	drawMaze();// 迷路を描画する
}

function createMaze(){

	// 通路の開始位置を決める(行奇数,列奇数)
	const r = floor(random()*((ROWS-2)/2))*2+1;
	const c = floor(random()*((COLS-2)/2))*2+1;
	maze[r][c] = M_ROAD;
	roads.push({r:r, c:c});// 道を記録する
	extendRoad(r, c);// 穴掘り法を開始する
}

function extendRoad(r, c){

	const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	// 要素が少ないのでlengthを使う
	for(let i=dirs.length-1; 0<i; i--){
		const tmp = dirs[i];
		const rdm = floor(random()*dirs.length);
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
		extendRoad(r+oR*2, c+oC*2);      // 再帰処理
	}
}

function drawMaze(){

	const size = floor((height*0.8) / ROWS);// セルのサイズ

	// 迷路の描画開始位置
	const oX = width/2 - COLS*size/2;
	const oY = height/2 - ROWS*size/2;
	// 迷路を描画する
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_ROAD) continue;
			const x = floor(oX + c * size);
			const y = floor(oY + r * size);
			square(x, y, size);
		}
	}
}
