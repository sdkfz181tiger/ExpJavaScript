"use strict"

console.log("utility.js");

const MARKER_ON  = "cornflowerblue";
const MARKER_OFF = "silver";

const BOMB_TYPE = [
	{color: "white", src:"./images/bomb_white.png"},// これは空白という意味です(0番は無し)
	{color: "black", src:"./images/bomb_black.png"},// 1
	{color: "red",   src:"./images/bomb_red.png"},  // 2
	{color: "green", src:"./images/bomb_green.png"},// 3
	{color: "blue",  src:"./images/bomb_blue.png"}  // 4
]

class MySprite{

	constructor(x, y, w, h){
		//console.log("MySprite");
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
	}

	draw(){
		noStroke();
		fill("silver");
		square(this._x, this._y, this._size);
	}

	contaisPos(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._w < x) return false;
		if(this._y + this._h < y) return false;
		return true;
	}
}

class MyMarker extends MySprite{

	constructor(x, y, size, type, image){
		//console.log("MyMarker");
		super(x, y, size, size);
		this._size = size;
		this._type = type;
		this._image = image;
		this._activeFlg = false;
		this._bombFlg = false;
	}

	draw(){
		const color = (this._activeFlg)?MARKER_ON:MARKER_OFF;
		noStroke();
		fill(color);
		square(this._x, this._y, this._size, this._size*0.1);
		if(this._type <= 0 || this._bombFlg == false) return;
		fill(BOMB_TYPE[this._type].color);
		const offset = this._size * 0.1;
		image(this._image, this._x+offset, this._y+offset, this._size*0.8, this._size*0.8);
	}

	click(x, y){
		if(!this.contaisPos(x, y)) return false;
		this._activeFlg = !this._activeFlg;
		return true;
	}

	reset(){
		this._activeFlg = false;
		this._bombFlg = false;
	}

	showBomb(){
		this._bombFlg = true;
	}

	getType(){
		return this._type;
	}

	isActive(){
		return this._activeFlg;
	}
}