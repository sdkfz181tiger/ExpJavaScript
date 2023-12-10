"use strict";

//==========
// JavaScript

const WIDTH  = 840;
const HEIGHT = 420;

const W_CARD = 58;
const H_CARD = 80;
const P_CARD = 2;

const T_SPADE = 0;
const T_DIA   = 1;
const T_CLUB  = 2;
const T_HEART = 3;

let canvas, ctx;
let cards, choises, drag, judge, sSheet;

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
	// Cards
	cards = [];
	choises = [];
	drag = null;
	judge = false;
	// SpriteSheet
	sSheet = new Image();
	sSheet.src = document.getElementById("source").innerHTML;
	sSheet.onload = ()=>{init();};
}

// Init
function init(){

	// Cards
	const rows = 4;
	const cols = 13;
	for(let t=0; t<rows; t++){
		for(let n=1; n<=cols; n++){
			const x = Math.floor(Math.random()*(WIDTH-W_CARD));
			const y = Math.floor(Math.random()*(HEIGHT-H_CARD));
			let card = new Card(x, y, n, t);
			cards.push(card);
		}
	}
	// Shuffle
	for(let i=cards.length-1; 0<i; i--){
		const rdm  = Math.floor(Math.random()*i);
		const tmp  = cards[rdm];
		cards[rdm] = cards[i];
		cards[i]   = tmp;
	}
	// Positions
	const sX = WIDTH / 2 - ((W_CARD+P_CARD)*cols) / 2;
	const sY = HEIGHT / 2 - ((H_CARD+P_CARD)*rows) / 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const i = r*cols + c;
			const card = cards[i];
			card.x = sX + c * (W_CARD+P_CARD);
			card.y = sY + r * (H_CARD+P_CARD);
		}
	}
	update();// Update;
}

// Update
function update(){
	// Clear
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	// Text
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Suijaku!!", WIDTH/2, 32);
	// Cards
	for(let card of cards) card.draw();
	// Update
	setTimeout(update, 40);
}

document.addEventListener("mousedown", (e)=>{
	//console.log("mousedown", e);
	if(1 < choises.length) return;
	const x = e.clientX;
	const y = e.clientY;
	// Cards
	for(let i=cards.length-1; 0<=i; i--){
		const card = cards[i];
		if(!card.press(x, y)) continue;
		cards.splice(i, 1);// Swap
		cards.push(card);// Cards
		if(!choises.includes(card)) choises.push(card);// Choises
		drag = card;// Drag
		return;
	}
});

document.addEventListener("mousemove", (e)=>{
	//console.log("mousemove", e);
	const x = e.clientX;
	const y = e.clientY;
	//if(drag) drag.drag(x, y);// Drag
});

document.addEventListener("mouseup", (e)=>{
	//console.log("mouseup", e);
	// Judge
	if(1 < choises.length){
		if(judge == true) return;// Judge
		judge = true;
		if(choises[0].num == choises[1].num){
			choises[0].finish();
			choises[1].finish();
			choises = [];// Choises
			judge = false;// Judge
			return;
		}
		setTimeout(()=>{
			for(let card of choises) card.close();// Close
			choises = [];// Choises
			judge = false;// Judge
		}, 1000);
	}
	drag = null;// Drag
});

class Card{

	constructor(x, y, num, type, open){
		this._x    = x;
		this._y    = y;
		this._num  = num;
		this._type = type;
		this._open = false;
		this._done = false;
		this._cX   = this._num * W_CARD;
		this._cY   = this._type * H_CARD;
		this._oX   = 0;
		this._oY   = 0;
	}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	get num(){return this._num;}
	get type(){return this._type;}

	draw(){
		// Draw
		const cX = (this._open) ? this._cX:0;
		const cY = (this._open) ? this._cY:0;
		ctx.drawImage(sSheet, cX, cY, W_CARD, H_CARD, 
			this._x, this._y, W_CARD, H_CARD);
	}

	open(){
		if(this._done) return;
		if(this._open) return;
		this._open = true;
	}

	close(){
		if(this._done) return;
		if(!this._open) return;
		this._open = false;
	}

	finish(){
		if(this._done) return;
		this._done = true;
	}

	press(x, y){
		if(this._done) return false;
		if(!this.isInside(x, y)) return false;
		this._oX = x - this._x;
		this._oY = y - this._y;
		this.open();// Open
		return true;
	}

	drag(x, y){
		if(this._done) return false;
		this._x = x - this._oX;
		this._y = y - this._oY;
	}

	isInside(x, y){
		if(x < this._x) return false;
		if(this._x+W_CARD < x) return false;
		if(y < this._y) return false;
		if(this._y+H_CARD < y) return false;
		return true;
	}
}