"use strict"

const COLORS = ["#008000", "#38B000", "#70E000", "#9EF01A", "#CCFF33"];
const WHITE  = "#555555";
const BLACK  = "#111111";

const LEN  = 10;
let map    = null;
let pathes = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES); rectMode(CENTER);
	textAlign(CENTER, BOTTOM); textSize(10);
	noLoop();
}

function draw(){
	background(BLACK);
	noFill();
	noStroke();

	stroke(WHITE); strokeWeight(1);

	const rows = floor(height / LEN);
	const cols = floor(width / LEN);
	map = Array.from(new Array(rows), () => new Array(cols).fill(null));

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const x = c * LEN + LEN / 2;
			const y = r * LEN + LEN / 2;
			map[r][c] = {r: r, c: c, x: x, y: y, used: false}
			//circle(x, y, 3);
		}
	}

	// Walker
	for(let i=0; i<rows*cols/10; i++){
		const r = floor(random(rows));
		const c = floor(random(cols));
		const total = floor(random(5, rows*cols/30));
		const walker = new RdmWalker(r, c, map);
		const path = walker.step(total);
		if(path) pathes.push(path);
	}
}

class RdmWalker{

	constructor(r, c, map){
		this._r    = r;
		this._c    = c;
		this._rows = map.length;
		this._cols = map[0].length;
		this._map  = map;
		this._path = [];
		this._color = floor(random(150, 255));
	}

	step(total){

		// Firststep
		const first = this._map[this._r][this._c];
		if(first.used == true) return;
		first.used = true;
		this._path.push(first);
		circle(first.x, first.y, 8);

		// Search
		this.search(total);

		// Color
		noFill(); stroke(getColor(COLORS)); strokeWeight(1);

		// Path
		for(let p=0; p<this._path.length-1; p++){
			const from = this._path[p];
			const to = this._path[p+1];
			circle(to.x, to.y, floor(random(4, 6)));
			line(from.x ,from.y, to.x, to.y);
		}
		return this._path;
	}

	search(total){
		if(total <= 0) return;

		// Dirs
		const dirs = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1], [0, 1],
			[1, -1], [1, 0], [1, 1]];
		for(let i=dirs.length-1; 0<i; i--){
			const rdm = floor(random(i));
			const tmp = dirs[rdm];
			dirs[rdm] = dirs[i];
			dirs[i]   = tmp;
		}

		// Found
		let found = false;
		for(let d=0; d<dirs.length; d++){

			const nR = this._r + dirs[d][0];
			const nC = this._c + dirs[d][1];
			if(this.isNG(nR, nC)) continue;

			this._r = nR;
			this._c = nC;
			found = true;
			const next = this._map[nR][nC];
			next.used = true;
			this._path.push(next);
			break;
		}

		if(!found) return;
		this.search(total - 1);// Recursive
	}

	isNG(nR, nC){
		if(nR < 0) return true;
		if(nC < 0) return true;
		if(this._rows <= nR) return true;
		if(this._cols <= nC) return true;
		if(this._map[nR][nC].used == true) return true;

		// Cross check
		for(let p=0; p<this._path.length-1; p++){
			const pA = this._map[this._r][this._c];
			const pB = this._map[nR][nC];
			const pC = this._path[p];
			const pD = this._path[p+1];
			if(isCrossedPath(pA, pB, pC, pD)) return true;
		}

		// Cross check
		const pA = this._map[this._r][this._c];
		const pB = this._map[nR][nC];
		if(isCrossedOther(pA, pB)) return true;

		return false;
	}
}

function isCrossedPath(a, b, c, d){
	const tc1 = (a.x-b.x)*(c.y-a.y) + (a.y-b.y)*(a.x-c.x);
	const tc2 = (a.x-b.x)*(d.y-a.y) + (a.y-b.y)*(a.x-d.x);
	const td1 = (c.x-d.x)*(a.y-c.y) + (c.y-d.y)*(c.x-a.x);
	const td2 = (c.x-d.x)*(b.y-c.y) + (c.y-d.y)*(c.x-b.x);
	return tc1*tc2<0 && td1*td2<0;
}

function isCrossedOther(pA, pB){
	for(let path of pathes){
		for(let p=0; p<path.length-1; p++){
			const pC = path[p];
			const pD = path[p+1];
			if(isCrossedPath(pA, pB, pC, pD)) return true;
		}
	}
	return false;
}

function getColor(colors){
	return colors[floor(random()*colors.length)];
}