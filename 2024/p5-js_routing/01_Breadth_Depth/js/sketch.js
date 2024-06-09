"use strict"

const WHITE = "#eeeeee";
const BLACK = "#333333";
const GRAY  = "#777777";
const RED   = "#ff6624";
const GREEN = "#66ff24";
const BLUE  = "#2466ff";

const ROWS  = 23;// 迷路の大きさ(行数)
const COLS  = 23;// 迷路の大きさ(列数)

const M_ROAD   = 0;// 道
const M_WALL   = 1;// 壁
const M_PILLAR = 2;// 柱

// 迷路の配列
const maze = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(M_ROAD));
const points = [];// 探索済み
const routes = [];// 探索候補
const start = {r:1, c:1, stp:0, fR:0, fC:0};// スタート位置
const goal  = {r:ROWS-2, c:COLS-2};// ゴール位置

let cnt = 0;// トレース用

function setup(){
	//createCanvas(windowWidth, windowHeight);
	createCanvas(950, 550);
	angleMode(DEGREES); frameRate(32);
	fill(WHITE); noStroke();

	randomSeed(59);    // Seed
	createMaze();      // 迷路生成
	points.push(start);// 探索済みに追加
	routes.push(start);// 探索候補に追加
	searchMaze();      // 迷路探索
}

function draw(){
	background(BLACK);

	showMaze();// 迷路表示

	cnt += 20;// トレース用
	//saveCanvas("test_" + floor(cnt/20) + ".png");// Save
}

//==========
// 迷路を探索するアルゴリズム(深度優先)

function searchMaze(){

	const route = routes.shift();// 先頭から取得(幅優先)
	//const route = routes.pop();// 最後尾から取得(深度優先)
	const sR    = route.r;
	const sC    = route.c;
	const stp   = route.stp;

	// ゴール判定
	if(sR == goal.r && sC == goal.c) return;
	
	// 上下左右の探索方向
	let dirs = [
		{r:-1, c:0, dist:99}, {r:1, c:0, dist:99},
		{r:0, c:-1, dist:99}, {r:0, c:1, dist:99}
	];

	// マンハッタン距離でゴール方向を優先
	for(let i=0; i<dirs.length; i++){
		const dR = goal.r - (sR+dirs[i].r);
		const dC = goal.c - (sC+dirs[i].c);
		dirs[i].dist = abs(dR + dC);
	}
	dirs = dirs.sort((a, b)=>b.dist - a.dist);

	for(let dir of dirs){
		const oR = sR + dir.r;
		const oC = sC + dir.c;
		if(!isRoad(oR, oC)) continue; // 道でない
		if(isPassed(oR, oC)) continue;// 探索済みである
		const from = {r:oR, c:oC, stp:stp+1, fR:sR, fC:sC};
		points.push(from);// 探索済みに追加
		routes.push(from);// 探索候補に追加
	}

	if(0 < routes.length) searchMaze();// 再帰処理

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

//==========
// 迷路を作るアルゴリズム(壁倒し法)

function createMaze(){

	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			maze[r][c] = (r==0||c==0||r==ROWS-1||c==COLS-1)?M_WALL:M_ROAD;
		}
	}
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_WALL) continue;
			maze[r][c] = (r%2==0&&c%2==0)?M_PILLAR:M_ROAD;
		}
	}
	for(let r=2; r<ROWS; r++){
		for(let c=2; c<COLS; c++){
			if(maze[r][c] == M_PILLAR){
				if(r==2){
					setWall(r, c, true);
				}else{
					setWall(r, c, false);
				}
			}
		}
	}
}

function setWall(r, c, flg){
	const max = (flg) ? 4:3;
	const rdm = floor(random() * max);
	if(rdm == 0) maze[r][c-1] = M_WALL;
	if(rdm == 1) maze[r][c+1] = M_WALL;
	if(rdm == 2) maze[r+1][c] = M_WALL;
	if(rdm == 3) maze[r-1][c] = M_WALL;
}

//==========
// 迷路を表示する処理

function showMaze(){
	const size = floor((height*0.8) / ROWS);// セルのサイズ
	const oX = width / 2 - COLS * size / 2;
	const oY = height / 2 - ROWS * size / 2;
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			if(maze[r][c] == M_ROAD) continue;
			if(maze[r][c] == M_WALL) fill(WHITE);
			if(maze[r][c] == M_PILLAR) fill(WHITE);
			const x = oX + c * size;
			const y = oY + r * size;
			square(x, y, size);
		}
	}

	// 探索済み
	for(let i=0; i<points.length; i++){
		if(cnt < i) break;
		const point = points[i];
		const x = oX + point.c * size + size/2;
		const y = oY + point.r * size + size/2;
		fill(GRAY);
		circle(x, y, size);
	}

	// 探索候補(ゴールから逆順にスタートまで辿る)
	if(points.length < cnt){
		let route = getRoute(goal.r, goal.c);
		while(route = getRoute(route.fR, route.fC)){
			const x = oX + route.c * size + size/2;
			const y = oY + route.r * size + size/2;
			fill(GREEN);
			circle(x, y, size/2);
		}
		noLoop();// Stop
	}

	// Start/Goal
	fill(BLUE);
	const sX = oX+start.c*size;
	const sY = oY+start.r*size;
	square(sX, sY, size);
	fill(RED);
	const gX = oX+goal.c*size;
	const gY = oY+goal.r*size;
	square(gX, gY, size);
	fill(WHITE);
	textAlign(CENTER, CENTER);
	text("S", sX+size/2, sY+size/2);
	text("G", gX+size/2, gY+size/2);
}

function getRoute(r, c){
	for(let point of points){
		if(point.r == r && point.c == c) return point;
	}
	return null;
}