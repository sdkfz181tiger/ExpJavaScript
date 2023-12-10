"use strict";

//==========
// Utility

//const palette = ["#233D4D", "#FE7F2D", "#FCCA46", "#A1C181", "#619B8A"];
const palette = ["#233D4D", "#FE7F2D", "#FCCA46"];

class CandyManager{

	constructor(sX, sY, types){
		this._sX    = sX;
		this._sY    = sY;
		this._types = types;
		this._mtx   = this.createMtx();
		this.initMatrix();
		this.compressV();
	}

	initMatrix(){
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				let x = this._sX + T_SIZE * c;
				let y = this._sY + T_SIZE * r;
				let type = Math.floor(Math.random()*this._types);
				if(this._mtx[r][c] != null) continue;
				this._mtx[r][c] = new Tile(r, c, x, y, type);
			}
		}
	}

	compressV(maxR){
		for(let c=COLS-1; 0<=c; c--){
			for(let r=ROWS-1; 0<=r; r--){
				if(this._mtx[r][c] != null) continue;
				for(let v=r-1; 0<=v; v--){
					if(this._mtx[v][c] == null) continue;
					this.swapTiles(r, c, v, c, maxR);// Swap
					break;
				}
			}
		}
	}

	compressH(){
		for(let r=ROWS-1; 0<=r; r--){
			for(let c=0; c<COLS-1; c++){
				if(this._mtx[r][c] != null) continue;
				for(let h=c+1; h<COLS; h++){
					if(this._mtx[r][h] == null) continue;
					this.swapTiles(r, c, r, h);// Swap
					break;
				}
			}
		}
	}

	swapTiles(aR, aC, bR, bC, maxR){
		this._mtx[aR][aC] = this._mtx[bR][bC];// Swap
		this._mtx[bR][bC] = null;
		let x = this._sX + T_SIZE * aC;// Change
		let y = this._sY + T_SIZE * aR;
		this._mtx[aR][aC].fall(aR, aC, x, y, maxR);
	}

	createMtx(){
		let mtx = [];
		for(let r=0; r<ROWS; r++){
			let line = [];
			for(let c=0; c<COLS; c++) line.push(null);
			mtx.push(line);
		}
		return mtx;
	}

	getMtx(){
		return this._mtx;
	}

	traceMtx(){
		let bar = "";
		for(let b=0; b<COLS*2+3; b++) bar += "=";
		bar += "\n";
		let str = bar;
		for(let r=0; r<ROWS; r++){
			let line = "| ";
			for(let c=0; c<COLS; c++){
				line += (this._mtx[r][c]==null)?"  ":this._mtx[r][c].type+" ";
			}
			str += line + "|\n";
		}
		str += bar;
		console.log(str);
	}

	touchTiles(tX, tY){
		// Moving
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				const tile = this._mtx[r][c];
				if(tile == null) return;
				if(tile.isMoving()) return;
			}
		}
		// Search
		this._chains = [];
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				let tile = this._mtx[r][c];
				if(tile == null) continue;
				if(tile.isInside(tX, tY)){
					this.searchTiles(tile);
				}
			}
		}
		// Remove
		if(this._chains.length < 2) return;
		let maxR = 0;
		for(let tile of this._chains){
			if(maxR < tile.r) maxR = tile.r;// MaxR
			this._mtx[tile.r][tile.c] = null;// Remove
		}
		this.compressV(maxR);// Compress(Vertial)
		//this.compressH();// Compress(Horizontal)
		this.traceMtx();// Trace

		// Refill
		setTimeout(()=>{
			this.initMatrix();
		}, 500);
	}

	searchTiles(tile){
		this._chains.push(tile);// Push
		this.traseTile(tile, 0, 1);
		this.traseTile(tile, 0,-1);
		this.traseTile(tile, 1, 0);
		this.traseTile(tile,-1, 0);
	}

	isExists(tile){
		for(let target of this._chains){
			if(tile.r != target.r) continue;
			if(tile.c != target.c) continue;
			return true;
		}
		return false;
	}

	traseTile(tile, oR, oC){
		if(tile.r+oR < 0) return;
		if(tile.c+oC < 0) return;
		if(ROWS-1 < tile.r+oR) return;
		if(COLS-1 < tile.c+oC) return;
		let target = this._mtx[tile.r+oR][tile.c+oC];
		if(target == null) return;
		if(tile.type != target.type) return;
		if(this.isExists(target)) return;
		this.searchTiles(target);
	}

	update(){
		// Clear
		ctx.fillStyle = "#333333";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		// Text
		ctx.fillStyle = "#ffffff";
		ctx.fillText("CandyCrasher!!", WIDTH/2, 32);
	}
}

class Tile{

	constructor(r, c, x, y, type){
		this._r    = r;
		this._c    = c;
		this._pos  = {x: x, y: y - ROWS*T_SIZE};
		this._type = type;
		this._movingFlg = false;
		this.fall(r, c, x, y);// Fall
	}

	fall(r, c, x, y, maxR=ROWS-1){
		this._r = r;
		this._c = c;
		this._movingFlg = true;
		const delay = (maxR-this._r)*40 + Math.floor(Math.random()*20);
		this._tween = new TWEEN.Tween(this._pos).to(
			{x: x, y: y}, 200).delay(delay).easing(TWEEN.Easing.Quadratic.In).onComplete(()=>{
				this._movingFlg = false;
			}).start();
	}

	get r(){return this._r;}
	get c(){return this._c;}
	get x(){return this._pos.x;}
	get y(){return this._pos.y;}
	get type(){return this._type;}

	isInside(tX, tY){
		if(tX < this._pos.x) return false;
		if(tY < this._pos.y) return false;
		if(this._pos.x+T_SIZE < tX) return false;
		if(this._pos.y+T_SIZE < tY) return false;
		return true;
	}

	isMoving(){
		return this._movingFlg;
	}

	update(){
		ctx.fillStyle = palette[Math.floor(this._type%palette.length)];
		ctx.fillRect(this._pos.x, this._pos.y, T_SIZE-2, T_SIZE-2);
		ctx.fillStyle = "#ffffff";
		ctx.fillText(this._type, this._pos.x+T_SIZE*0.5, this._pos.y+T_SIZE*0.7);
	}
}