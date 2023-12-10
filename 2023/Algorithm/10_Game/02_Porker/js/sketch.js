"use strict";

//==========
// JavaScript

const TITLES = ["RFl", "SFl", "FoC", "FuH", "Fla", "Str", "Thr", "TPa", "OPa", "Los"];

const WIDTH  = 480;
const HEIGHT = 320;

const W_CARD = 58;
const H_CARD = 80;
const P_CARD = 2;

let canvas, ctx;
let cards, sSheet;
let cntTotal, cntResults;
let cntNums, cntSuits;

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
			let card = new Card(0, 0, n, t);
			cards.push(card);
		}
	}
	cntTotal = 0;// Counter
	cntResults = new Array(10).fill(0);
	shuffle();// Shuffle;
}

// Shuffle
function shuffle(){
	// Counter
	cntTotal++;
	cntNums  = new Array(13).fill(0);
	cntSuits = new Array(4).fill(0);
	// Close
	for(let card of cards){
		card.close();
		card.x = WIDTH - W_CARD - 5;
		card.y = HEIGHT - H_CARD - 5;
	}
	// Shuffle
	for(let i=cards.length-1; 0<i; i--){
		const rdm  = Math.floor(Math.random()*i);
		const tmp  = cards[rdm];
		cards[rdm] = cards[i];
		cards[i]   = tmp;
	}
	// Open
	const sX = WIDTH / 2 - ((W_CARD+P_CARD)*5) / 2;
	const sY = HEIGHT / 2 - H_CARD / 2;
	for(let i=0; i<5; i++){
		const card = cards[i];
		card.open();
		card.x = sX + i * (W_CARD+P_CARD);
		card.y = sY;
		// Count
		cntNums[card.num-1]++;
		cntSuits[card.suit]++;
	}
	show();
}

// Show
function show(){
	// Clear
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	// Text
	ctx.textAlign = "center";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Poker!!", WIDTH/2, 32);
	ctx.fillText("Total:" + cntTotal, WIDTH/2, 98);
	// Cards
	for(let card of cards) card.draw();
	// Check
	if(isRoyalFlash()){
		ctx.fillText("Royal Flash!!", WIDTH/2, HEIGHT-64);
		cntResults[0]++;
		return;
	}else if(isStraitFlash()){
		ctx.fillText("Strait Flash!!", WIDTH/2, HEIGHT-64);
		cntResults[1]++;
		return;
	}else if(isFourcard()){
		ctx.fillText("Four card!!", WIDTH/2, HEIGHT-64);
		cntResults[2]++;
	}else if(isFullhouse()){
		ctx.fillText("Fullhouse!!", WIDTH/2, HEIGHT-64);
		cntResults[3]++;
	}else if(isFlash()){
		ctx.fillText("Flash!!", WIDTH/2, HEIGHT-64);
		cntResults[4]++;
	}else if(isStrait()){
		ctx.fillText("Strait!!", WIDTH/2, HEIGHT-64);
		cntResults[5]++;
	}else if(isThreecard()){
		ctx.fillText("Three card!!", WIDTH/2, HEIGHT-64);
		cntResults[6]++;
	}else if(isTwopair()){
		ctx.fillText("Two pair!!", WIDTH/2, HEIGHT-64);
		cntResults[7]++;
	}else if(isOnepair()){
		ctx.fillText("One pair!!", WIDTH/2, HEIGHT-64);
		cntResults[8]++;
	}else{
		ctx.fillText("You loose...", WIDTH/2, HEIGHT-64);
		cntResults[9]++;
	}

	ctx.textAlign = "left";
	ctx.fillStyle = "#cccccc";
	for(let i=0; i<cntResults.length; i++){
		ctx.fillText(TITLES[i] + ":" + cntResults[i], 5, 20+20*i);
	}

	// Update
	setTimeout(shuffle, 20);
}

// Check
function isRoyalFlash(){
	if(cntNums[0] < 1) return false;
	for(let i=9; i<cntNums.length; i++){
		if(cntNums[i] < 1) return false;
	}
	return isFlash();
}

function isStraitFlash(){
	return isStrait() && isFlash();
}

function isFourcard(){
	return cntNums.includes(4);
}

function isFullhouse(){
	let cnt2 = 0;
	let cnt3 = 0;
	for(let num of cntNums){
		if(num == 2) cnt2++;
		if(num == 3) cnt3++;
	}
	return 0 < cnt2 && 0 < cnt3;
}

function isFlash(){
	return cntSuits.includes(5);
}

function isStrait(){
	for(let i=0; i<cntNums.length-5; i++){
		if(cntNums[i] == 0) continue;
		let total = 0;
		for(let j=i; j<cntNums.length; j++){
			if(cntNums[j] == 0) break;
			total++;
		}
		return 4 < total;
	}
	return false;
}

function isThreecard(){
	return cntNums.includes(3);
}

function isTwopair(){
	let cnt = 0;
	for(let num of cntNums) if(num == 2) cnt++;
	return 1 < cnt;
}

function isOnepair(){
	return cntNums.includes(2);
}

class Card{

	constructor(x, y, num, suit, open){
		this._x    = x;
		this._y    = y;
		this._num  = num;
		this._suit = suit;
		this._open = false;
		this._cX   = this._num * W_CARD;
		this._cY   = this._suit * H_CARD;
	}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	get num(){return this._num;}
	get suit(){return this._suit;}

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
}