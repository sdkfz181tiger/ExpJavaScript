"use strict";

//==========
// Utility

const T_NONE  = 0;
const T_WHITE = 1;
const T_BLACK = 2;

const WIDTH  = 320;
const HEIGHT = 320;

const ROWS   = 6;
const COLS   = 6;
const T_SIZE = 28;
const T_DIR  = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

class ReversiManager{

	constructor(sX, sY){
		this._sX      = sX;
		this._sY      = sY;
		this._you     = (Math.random()<0.5) ? T_WHITE:T_BLACK;
		this._turn    = T_WHITE;
		this._board   = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(T_NONE));
		this._btnBack = new Button(0, 0);
		this._logs    = [];
		this.initMatrix();
	}

	initMatrix(){
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				let x = this._sX + T_SIZE * c;
				let y = this._sY + T_SIZE * r;
				this._board[r][c] = new Tile(r, c, x, y);
			}
		}
		const cR = ROWS / 2 - 1;
		const cC = COLS / 2 - 1;
		this._board[cR][cC].type     = T_WHITE;
		this._board[cR+1][cC+1].type = T_WHITE;
		this._board[cR][cC+1].type   = T_BLACK;
		this._board[cR+1][cC].type   = T_BLACK;
		this.pushLogs();// Logs
		this.checkDirs();// Check
		setTimeout(()=>{// Com
			if(this._you!=this._turn) this.selectCom();
		}, 1000);
	}

	pushLogs(){
		let log = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(T_NONE));
		let w = 0;
		let b = 0;
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				const type = this._board[r][c].type;
				log[r][c] = type;
				if(type == T_WHITE) w++;
				if(type == T_BLACK) b++;
			}
		}
		this._logs.push({"log":log, "w":w, "b":b, "turn":this._turn});// Push
	}

	popLogs(){
		if(this._logs.length <= 1) return;
		this._logs.pop();// Pop
		const last = this._logs[this._logs.length-1];
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				this._board[r][c].type = last.log[r][c];
			}
		}	
		this._turn = last.turn;// Turn
		if(this._logs.length <= 1){
			setTimeout(()=>{// Com
				if(this._you!=this._turn) this.selectCom();
			}, 1000);
		}
	}

	checkDirs(loop=0){
		let cnt = 0;// Counter
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				let tile = this._board[r][c];
				tile.clearDirs();// Clear
				if(tile.type != T_NONE) continue;
				for(let i=0; i<T_DIR.length; i++){
					if(!this.checkDir(r, c, T_DIR[i], 0)) continue;
					tile.pushDirs(T_DIR[i]);
					cnt++;
				}
			}
		}
		if(cnt <= 0){
			if(loop < 0) return;// Back
			if(1 < loop){
				console.log("Finished!!");
			}else{
				console.log("Pass!!");
				this.changeTurn();// Change
				this.checkDirs(loop+1);// Check
				setTimeout(()=>{// Com
					this.selectCom();
				}, 1000);
			}
		}
	}

	checkDir(r, c, dir, cnt){
		const oR = r + dir[0];
		const oC = c + dir[1];
		if(oR < 0 || ROWS-1<oR) return false;
		if(oC < 0 || COLS-1<oC) return false;
		const next = this._board[oR][oC];
		if(next.type == T_NONE) return false;
		if(next.type != this._turn){
			return this.checkDir(oR, oC, dir, cnt+1);
		}
		if(next.type == this._turn && 0 < cnt) return true;
		return false;
	}

	selectYou(tX, tY){
		if(this._you != this._turn) return;
		// Board
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				const tile = this._board[r][c];
				if(!tile.isInside(tX, tY)) continue;
				if(tile.type != T_NONE) continue;
				if(tile.dirs.length <= 0) continue;
				this.turnTiles(tile);// Turn
				this.pushLogs();// Logs
				this.changeTurn();// Change
				this.checkDirs();// Check
				setTimeout(()=>{// Com
					this.selectCom();
				}, 1000);
			}
		}
	}

	pressBack(tX, tY){
		// Button
		if(this._btnBack.isInside(tX, tY)){
			this.popLogs();// Pop
			this.checkDirs(-1);// Check
		}
	}

	selectCom(){
		if(this._you == this._turn) return;
		// Board
		const tiles = [];
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				const tile = this._board[r][c];
				if(tile.type != T_NONE) continue;
				if(tile.dirs.length <= 0) continue;
				tiles.push(tile);
			}
		}
		// Random
		if(tiles.length <= 0) return;
		const index = Math.floor(Math.random() * tiles.length);
		this.turnTiles(tiles[index]);// Turn
		this.pushLogs();// Logs
		this.changeTurn();// Change
		this.checkDirs();// Check
	}

	turnTiles(tile){
		// Tile
		tile.type = this._turn;// Turn
		const r = tile.r;
		const c = tile.c;
		for(let dir of tile.dirs) {
			let stp = 1;
			let next = this._board[r][c];
			do{
				next.type = tile.type;// Turn
				let oR = r + dir[0] * stp;
				let oC = c + dir[1] * stp;
				if(oR < 0 || ROWS-1<oR) break;
				if(oC < 0 || COLS-1<oC) break;
				next = this._board[oR][oC];
				stp++;
			}while(next.type != tile.type);
		}
	}

	changeTurn(){
		this._turn = (this._turn==T_WHITE) ? T_BLACK:T_WHITE;
	}

	getYou(){
		return this._you;
	}

	getTurn(){
		return this._turn;
	}

	getLastLog(){
		return this._logs[this._logs.length-1];
	}

	draw(){
		// Board
		const hLight = this._you==this._turn;// Highlight
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				this._board[r][c].draw(hLight);
			}
		}
		// Button
		this._btnBack.draw();
	}
}

class Tile{

	constructor(r, c, x, y){
		this._r    = r;
		this._c    = c;
		this._x    = x;
		this._y    = y;
		this._type = T_NONE;
		this._dirs = [];
	}

	isInside(tX, tY){
		if(tX < this._x) return false;
		if(tY < this._y) return false;
		if(this._x+T_SIZE < tX) return false;
		if(this._y+T_SIZE < tY) return false;
		return true;
	}

	draw(hLight){
		ctx.fillStyle = (hLight && 0 < this._dirs.length) ? "#ddcc00":"#008800"; 
		ctx.fillRect(this._x, this._y, T_SIZE-2, T_SIZE-2);
		if(this._type == T_NONE) return;
		ctx.fillStyle = (this._type == T_WHITE) ? "#ffffff":"#000000";
		ctx.beginPath();
		ctx.arc(this._x+T_SIZE/2, this._y+T_SIZE/2, 8, 0, Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
	}

	get r(){return this._r;}
	get c(){return this._c;}
	get x(){return this._x;}
	get y(){return this._y;}

	get type(){return this._type;}
	set type(t){this._type = t;}

	get dirs(){return this._dirs;}
	clearDirs(){this._dirs.splice(0);}
	pushDirs(dir){this._dirs.push(dir);}
}

class Button{

	constructor(x, y){
		this._x = x;
		this._y = y;
	}

	isInside(tX, tY){
		if(tX < this._x) return false;
		if(tY < this._y) return false;
		if(this._x+T_SIZE < tX) return false;
		if(this._y+T_SIZE < tY) return false;
		return true;
	}

	draw(){
		ctx.fillStyle = "#008800";
		ctx.fillRect(this._x, this._y, T_SIZE, T_SIZE);
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		ctx.fillText("<<", this._x+T_SIZE/2, this._y+T_SIZE*0.7);
	}
}