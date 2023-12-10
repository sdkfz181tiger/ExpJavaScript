"use strict";

//==========
// Enigma Simurator

const CODES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROT_1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
const ROT_2 = [20,21,22,23,24,25,11,12,13,14,15,16,17,18,19,0,1,2,3,4,5,6,7,8,9,10];
const ROT_3 = [22,23,24,25,6,7,8,9,10,11,12,13,14,15,16,17,0,1,2,3,4,5,18,19,20,21];

// Enigma
class Enigma{

	constructor(){
		console.log("Enigma");
	}

	init(n1, n2, n3){
		// Scrambler
		// n1, n2, n3: ローター回転値
		this._scrambler = new Scrambler(n1, n2, n3);
	}

	decode(str){
		let result = "";
		for(let c of str){
			this._scrambler.rotate();// Rotate
			result += this._scrambler.decode(c);// Decode
			console.log(this.getInfo());
		}
		return result;
	}

	getInfo(){
		return this._scrambler.getInfo();
	}
}

// Scrambler
class Scrambler{

	constructor(n1, n2, n3){
		console.log("Scrambler");

		// Roters(3つのローターを装備)
		// 第一引数: ローター回転値
		// 第二引数: ローター内配線
		this._roters = [
			new Roter(n1, ROT_1),
			new Roter(n2, ROT_2),
			new Roter(n3, ROT_3)
		];
	}

	decode(c){
		const size = this._roters.length;
		for(let i=0; i<size; i++){// Forward
			c = this._roters[i].forward(c);
		}
		c = this._roters[size-1].reflect(c);// Reflect
		for(let i=size-1; 0<=i; i--){// Backward
			c = this._roters[i].backward(c);
		}
		return c;
	}

	rotate(){
		// 右のローターを回転(1周すると次のローターも回転)
		for(let i=this._roters.length-1; 0<=i; i--){
			const roter = this._roters[i];
			if(!roter.rotate()) return;
		}
	}

	getInfo(){
		let info = "roters: ";
		for(let roter of this._roters){
			info += roter.index + ",";
		}
		return info;
	}
}

// Roter
class Roter{

	constructor(index, ptn){
		//console.log("Roter");
		this._index = index % ptn.length;// Index
		this._ptn   = ptn;
		this.init();
	}

	init(){
		// init
		this._forward = {}
		this._backward = {}
		const size = this._ptn.length;
		for(let i=0; i<size; i++){
			const o = (this._index + i) % size;
			this._forward[i] = this._ptn[o];
			this._backward[this._ptn[o]] = i;
		}
	}

	forward(c){
		const i = this.getIndex(c);
		const f = this._forward[i];
		//console.log("forward:", i, "->", f);
		return CODES[f];
	}

	backward(c){
		const i = this.getIndex(c);
		const b = this._backward[i];
		//console.log("backward:", i, "->", b);
		return CODES[b];
	}

	reflect(c){
		const i = this.getIndex(c);
		const r = this._ptn.length-1 - i;
		//console.log("reflect:", i, "->", r);
		return CODES[r];
	}

	getIndex(c){
		for(let i=0; i<CODES.length; i++){
			if(CODES[i] == c) return i;
		}
		return -1;
	}

	rotate(){
		this._index++;
		if(this._ptn.length-1 < this._index){
			this._index = 0;
			this.init();// Init
			return true;
		}
		this.init();// Init
		return false;
	}

	get index(){
		return this._index;
	}
}
