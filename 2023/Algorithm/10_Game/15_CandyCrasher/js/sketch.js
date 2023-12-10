"use strict";

//==========
// JavaScript

const WIDTH  = 320;
const HEIGHT = 480;

const ROWS   = 11;
const COLS   = 7;
const T_SIZE = 32;

let canvas, ctx, cMng;

// Window
window.onload = (e)=>{
	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;
	// Context
	ctx = canvas.getContext("2d");
	ctx.font        = "18px Arial";
	ctx.textAlign   = "center";
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth   = 2;
	// CandyManager
	let sX = WIDTH/2  - COLS*T_SIZE/2;
	let sY = HEIGHT/2 - ROWS*T_SIZE/2 + T_SIZE/2;
	cMng = new CandyManager(sX, sY, palette.length);
	cMng.traceMtx();// Trace
	update(0);// Update
}

// Update
function update(){
	cMng.update();// Update
	// Matrix
	let mtx = cMng.getMtx();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let tile = mtx[r][c];
			if(tile == null) continue;
			tile.update();// Update
		}
	}
	TWEEN.update();// Tween
	setTimeout(update, 20);
}

document.addEventListener("click", (e)=>{
	cMng.touchTiles(e.x, e.y);
});