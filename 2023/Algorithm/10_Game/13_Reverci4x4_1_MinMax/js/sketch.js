"use strict";

//==========
// JavaScript

let canvas, ctx, rMng;

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
	// ReversiManager
	const sX = WIDTH/2 - COLS*T_SIZE/2;
	const sY = HEIGHT/2 - ROWS*T_SIZE/2;
	rMng = new ReversiManager(sX, sY);
	update();// Update
}

// Update
function update(){
	// Clear
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	// ReversiManager
	rMng.update();
	setTimeout(update, 400);
}

document.addEventListener("click", (e)=>{
	rMng.thinkPlayer(e.x, e.y);// Player
});