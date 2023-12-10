"use strict"

class Roter{

	constructor(x, y, rad, alp, rot){
		this._cX  = x;
		this._cY  = y;
		this._rad = rad;
		this._alp = Array.from(alp);
		this._rot = Array.from(rot);
		this._num = 0;
		this._pad = 360 / rot.length;
		this._poses = [];
	}

	drawRoter(){

		noFill();
		stroke(100);
		strokeWeight(1);
		circle(this._cX, this._cY, this._rad*1.8);

		for(let i=0; i<360; i+=this._pad){
			const x = this._cX + this._rad*0.9 * cos(i);
			const y = this._cY + this._rad*0.9 * sin(i);
			this._poses.push({x:x, y:y});
			fill(255);
			noStroke();
			circle(x, y, 6);
		}

		for(let i=0; i<this._rot.length; i+=2){
			this.connectLine(i, i+1);
			this.drawAlphabet(this._rad, i);
			this.drawAlphabet(this._rad, i+1);
		}
	}

	rotate(){
		const tmp = this._alp[0];// Rotate
		this._alp = this._alp.splice(1);
		this._alp.push(tmp);
		this._num = (this._num + 1) % this._rot.length;
		return this._num == 0;
	}

	reset(alp, rot){
		this._alp = Array.from(alp);
		this._rot = Array.from(rot);
		this._num = 0;
	}

	get num(){return this._num;}

	connectLine(from, to, color=100, weight=1){
		noFill();
		stroke(color);
		strokeWeight(weight);
		const len = this._rad / 2;
		const oA = this._rot[from];
		const oB = this._rot[to];
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
		text(this._alp[i], x, y);
	}

	exchange(alphabet, color){

		let a = -1;
		for(let i=0; i<this._alp.length; i++){
			if(this._alp[i] != alphabet) continue;
			a = i;
		}
		if(a<0) return -1;

		let from = -1;
		for(let i=0; i<this._rot.length; i++){
			if(this._rot[i] != a) continue;
			from = i;
		}
		if(from<0) return -1;
		
		const to = (from%2==0)?from+1:from-1;
		this.connectLine(from, to, color, 2);
		return this._alp[this._rot[to]];
	}

	reflect(alphabet, color){

		let a = -1;
		for(let i=0; i<this._alp.length; i++){
			if(this._alp[i] != alphabet) continue;
			a = i;
		}
		if(a<0) return -1;

		let from = -1;
		for(let i=0; i<this._rot.length; i++){
			if(this._rot[i] != a) continue;
			from = i;
		}
		if(from<0) return -1;

		const mid = Math.floor(this._alp.length / 2);
		const to = (from<mid) ? from+mid:from-mid;
		this.connectLine(from, to, color, 2);
		return this._alp[this._rot[to]];
	}
}
