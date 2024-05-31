"use strict"

const WHITE = "#eeeeee";
const BLACK = "#333333";
const RED   = "#dd6624";

const ROWS  = 13;// 迷路の大きさ(行数)
const COLS  = 13;// 迷路の大きさ(列数)

const M_ROAD   = 0;// 道
const M_WALL   = 1;// 壁
const M_PILLAR = 2;// 柱

// 迷路の配列
const maze = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_ROAD));

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); noLoop();
	fill(WHITE); noStroke();
}

function draw(){
	background(BLACK);

	//randomSeed(99);// Seed
	createMaze();
	console.table(maze);
	showMaze();
}

function createMaze(){

	// 1, 迷路の周囲に外壁を作る
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			maze[r][c] = (r==0||c==0||r==ROWS-1||c==COLS-1)?M_WALL:M_ROAD;
		}
	}
	// 2, 外壁より内部のスペースに"柱"を1マスおきに並べる
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_WALL) continue;
			maze[r][c] = (r%2==0&&c%2==0)?M_PILLAR:M_ROAD;
		}
	}
	// 3, 並べた"柱"それぞれを起点に"上下左右"いずれか1マスを"壁"とする
	for(let r=2; r<ROWS; r++){
		for(let c=2; c<COLS; c++){
			if(maze[r][c] == M_PILLAR){
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
	const rdm = floor(random() * max);
	if(rdm == 0) maze[r][c-1] = 1;// 左を壁に
	if(rdm == 1) maze[r][c+1] = 1;// 右を壁に
	if(rdm == 2) maze[r+1][c] = 1;// 下を壁に
	if(rdm == 3) maze[r-1][c] = 1;// 上を壁に
}

function showMaze(){

	const size = floor((height*0.8) / ROWS);// セルのサイズ

	// 迷路の描画開始位置
	const oX = width / 2 - COLS * size / 2;
	const oY = height / 2 - ROWS * size / 2;

	// 壁を描画する
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_ROAD) continue;
			if(maze[r][c] == M_WALL) fill(WHITE);
			if(maze[r][c] == M_PILLAR) fill(RED);
			const x = oX + c * size;
			const y = oY + r * size;
			square(x, y, size);
		}
	}
}