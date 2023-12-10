"use strict";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROT_A = [1,8,20,16,7,19,24,0,11,13,22,2,5,12,14,3,15,4,23,25,17,18,21,6,9,10];
const ROT_B = [4,3,18,19,11,9,25,24,17,23,12,14,13,21,5,15,16,2,10,22,20,0,1,8,7,6];
const ROT_C = [18,21,2,7,14,13,5,6,23,15,20,4,12,11,22,25,1,10,0,16,8,17,24,3,19,9];

class Roter{

	constructor(x, y, rad, rot){
		this._cX  = x;
		this._cY  = y;
		this._rad = rad;
		this._rot = rot;
		this._num = 0;
		this._pad = 360 / ALPHABETS.length;
		this._poses = [];
	}

	drawRoter(){

		noFill();
		stroke(100);
		strokeWeight(1);
		circle(this._cX, this._cY, this._rad*2);

		for(let i=0; i<360; i+=this._pad){
			const x = this._cX + this._rad * cos(i);
			const y = this._cY + this._rad * sin(i);
			this._poses.push({x:x, y:y});
			fill(255);
			noStroke();
			circle(x, y, 6);
		}

		for(let i=0; i<this._rot.length; i+=2){
			this.connectLine(i, i+1);
			this.drawAlphabet(this._rad*1.15, i);
			this.drawAlphabet(this._rad*1.15, i+1);
		}
	}

	rotate(){
		this._num = (this._num + 1) % this._rot.length;
		return this._num == 0;
	}

	get num(){return this._num;}

	connectLine(from, to, color=100, weight=1){
		noFill();
		stroke(color);
		strokeWeight(weight);
		const len = this._rad / 2;
		const oA = (this._rot[from]+this._num) % this._poses.length;
		const oB = (this._rot[to]+this._num) % this._poses.length;
		const pA = this._poses[oA];
		const pB = this._poses[oB];
		const dA = atan2(pA.y-this._cY, pA.x-this._cX);
		const tA = {x: this._cX+len*cos(dA), y: this._cY+len*sin(dA)};
		const dB = atan2(pB.y-this._cY, pB.x-this._cX);
		const tB = {x: this._cX+len*cos(dB), y: this._cY+len*sin(dB)};
		bezier(pA.x, pA.y, tA.x, tA.y, tB.x, tB.y, pB.x, pB.y);
	}

	drawAlphabet(len, i){
		fill(255);
		noStroke();
		const x = this._cX + len * cos(this._pad*i);
		const y = this._cY + len * sin(this._pad*i);
		text(ALPHABETS[i], x, y);
	}

	decode(alphabet, color){
		let a = -1;
		for(let i=0; i<ALPHABETS.length; i++){
			if(ALPHABETS[i] != alphabet) continue;
			a = i;
		}
		if(a<0) return -1;
		a = (a+ALPHABETS.length-this._num) % ALPHABETS.length;
		let from = -1;
		for(let i=0; i<this._rot.length; i++){
			if(this._rot[i] != a) continue;
			from = i;
		}
		if(from<0) return -1;
		
		const to = (from%2==0)?from+1:from-1;
		this.connectLine(from, to, color, 2);
		return ALPHABETS[this._rot[to]];
	}
}