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
	// Black or White
	ctx.fillStyle = "#ffffff";
	const strYou = (rMng.getYou() == T_WHITE) ? "You:White":"You:Black";
	ctx.textAlign = "left";
	ctx.fillText(strYou, 50, 28);
	// You or Com
	const strTurn = (rMng.getYou() == rMng.getTurn()) ? "Turn:You":"Turn:Com";
	ctx.textAlign = "right";
	ctx.fillText(strTurn, WIDTH-50, 28);
	// Score
	const log = rMng.getLastLog();
	ctx.textAlign = "center";
	ctx.fillText("W:" + log.w + "_B:" + log.b, WIDTH/2, HEIGHT-18);
	// ReversiManager
	rMng.draw();
	setTimeout(update, 100);
}

document.addEventListener("click", (e)=>{
	rMng.selectYou(e.x, e.y);
	rMng.pressBack(e.x, e.y);
});