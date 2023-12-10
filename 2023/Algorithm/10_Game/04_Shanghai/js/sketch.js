"use strict";

//==========
// JavaScript

const WIDTH  = 720;
const HEIGHT = 540;

const W_CARD = 58;
const H_CARD = 80;
const P_CARD = 12;// カードの隙間
const T_CARD = 8;// カードの厚さ

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
	ctx.imageSmoothingEnabled = false;
	ctx.font        = "18px Arial";
	ctx.textAlign   = "center";
	ctx.fillStyle   = "silver";
	ctx.strokeStyle = "gray";
	ctx.lineWidth   = 1;
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
	for(let t=0; t<4; t++){
		for(let n=1; n<=13; n++){
			cards.push(new Card(0, 0, n, t));
		}
	}
	// Shuffle
	for(let i=cards.length-1; 0<i; i--){
		const rdm  = Math.floor(Math.random()*i);
		const tmp  = cards[rdm];
		cards[rdm] = cards[i];
		cards[i]   = tmp;
	}
	createPyramid();// Pyramid
	update();// Update;
}

function createPyramid(){
	setFloor(WIDTH/2, HEIGHT/2, 4, 9, 0, 0, 0);
	setFloor(WIDTH/2, HEIGHT/2, 2, 7, 36, -T_CARD, -T_CARD);

	cards[50].x = WIDTH/2 - (W_CARD+P_CARD)*1 - (W_CARD+P_CARD)/2;
	cards[50].y = HEIGHT/2 + (H_CARD+P_CARD)*2;
	cards[51].x = WIDTH/2 + (W_CARD+P_CARD)*1 - (W_CARD+P_CARD)/2;
	cards[51].y = HEIGHT/2 + (H_CARD+P_CARD)*2;
}

function setFloor(cX, cY, rows, cols, off, oX, oY){

	const sX = cX - ((W_CARD+P_CARD)*cols) / 2;
	const sY = cY - ((H_CARD+P_CARD)*rows) / 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			const i = r*cols + c + off;
			if(cards.length <= i) return;
			const card = cards[i];
			card.x = sX + c * (W_CARD+P_CARD) + oX;
			card.y = sY + r * (H_CARD+P_CARD) + oY;
		}
	}
}

// Update
function update(){
	// Clear
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	// Text
	ctx.fillStyle = "white";
	ctx.fillText("Shanghai!!", WIDTH/2, 32);
	// Cards
	ctx.fillStyle = "silver";
	ctx.strokeStyle = "gray";
	ctx.lineWidth = 1;
	for(let card of cards) card.draw();
	// Choises
	ctx.strokeStyle = "red";
	ctx.lineWidth = 4;
	for(let card of choises){
		ctx.beginPath();
		ctx.moveTo(card.x-T_CARD, card.y-T_CARD);
		ctx.lineTo(card.x-T_CARD+W_CARD, card.y-T_CARD);
		ctx.lineTo(card.x-T_CARD+W_CARD, card.y-T_CARD+H_CARD);
		ctx.lineTo(card.x-T_CARD, card.y-T_CARD+H_CARD);
		ctx.closePath();
		ctx.stroke();
	}
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
		if(isHided(i, card)) continue;// Hided
		//swapFront(i, card);// Swap
		pushChoises(card);// Choises
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
			//for(let card of choises) card.close();// Close
			choises = [];// Choises
			judge = false;// Judge
		}, 100);
	}
	drag = null;// Drag
});

function isHided(index, card){
	for(let i=index+1; i<cards.length; i++){
		const other = cards[i];
		if(card.x + W_CARD < other.x) continue;
		if(other.x + W_CARD < card.x) continue;
		if(card.y + H_CARD < other.y) continue;
		if(other.y + H_CARD < card.y) continue;
		return true;
	}
	return false;
}

function swapFront(index, card){
	cards.splice(index, 1);// Swap
	cards.push(card);// Cards
}

function pushChoises(card){
	if(choises.includes(card)) return;
	choises.push(card);// Choises
}

class Card{

	constructor(x, y, num, type){
		this._x     = Math.floor(x);
		this._y     = Math.floor(y);
		this._num   = num;
		this._type  = type;
		this._open  = true;// Open / Close
		this._done  = false;
		this._cX    = this._num * W_CARD;
		this._cY    = this._type * H_CARD;
		this._dX    = 0;
		this._dY    = 0;
	}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	get x(){return this._x;}
	get y(){return this._y;}

	get num(){return this._num;}
	get type(){return this._type;}

	draw(){
		// Shadow
		ctx.beginPath();
		ctx.moveTo(this._x+W_CARD-T_CARD, this._y-T_CARD);
		ctx.lineTo(this._x+W_CARD, this._y);
		ctx.lineTo(this._x+W_CARD, this._y+H_CARD-2);
		ctx.lineTo(this._x+W_CARD-2, this._y+H_CARD);
		ctx.lineTo(this._x, this._y+H_CARD);
		ctx.lineTo(this._x-T_CARD, this._y+H_CARD-T_CARD);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		// Draw
		const cX = (this._open) ? this._cX:0;
		const cY = (this._open) ? this._cY:0;
		ctx.drawImage(sSheet, cX, cY, W_CARD, H_CARD, 
			this._x-T_CARD, this._y-T_CARD, W_CARD, H_CARD);
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
		this._x = -W_CARD;
		this._y = -H_CARD;
	}

	press(x, y){
		if(this._done) return false;
		if(!this.isInside(x, y)) return false;
		this._dX = x - this._x;
		this._dY = y - this._y;
		this.open();// Open
		return true;
	}

	drag(x, y){
		if(this._done) return false;
		this._x = x - this._dX;
		this._y = y - this._dY;
	}

	isInside(x, y){
		if(x < this._x) return false;
		if(this._x+W_CARD < x) return false;
		if(y < this._y) return false;
		if(this._y+H_CARD < y) return false;
		return true;
	}
}