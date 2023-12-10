"use strict"

class Scrambler{

	constructor(x, y, rad, msg){

		this._cX = x;
		this._cY = y;

		this._cryptFlg = true;
		this._decoded  = msg;// Your message!!
		this._encoded  = "";

		this._roters = [];
		const roterA = new Roter(x-rad*2.1, y, rad, ALPHABETS, ROT_A);
		const roterB = new Roter(x, y, rad, ALPHABETS, ROT_B);
		const roterC = new Roter(x+rad*2.1, y, rad, ALPHABETS, ROT_C);
		this._roters.push(roterA);
		this._roters.push(roterB);
		this._roters.push(roterC);
	}

	drawRoters(){

		// Roters
		for(let i=this._roters.length-1; 0<=i; i--){
			if(!this._roters[i].rotate()) break;
		}

		// Roter
		for(let roter of this._roters) roter.drawRoter();

		if(this._cryptFlg){
			if(0 < this._decoded.length){
				this._encoded += this.convert(this._decoded[0]);
				this._decoded = this._decoded.slice(1);
			}else{
				this._cryptFlg = !this._cryptFlg;
				this.reset();// Reset
			}
		}else{
			if(0 < this._encoded.length){
				this._decoded += this.convert(this._encoded[0]);
				this._encoded = this._encoded.slice(1);
			}else{
				this._cryptFlg = !this._cryptFlg;
				this.reset();// Reset
			}
		}
		//console.log(this._encoded, "<->", this._decoded);

		fill(255);
		noStroke();
		const mark = (this._cryptFlg) ? " -> ":" <- ";
		const msg = this._decoded + mark + this._encoded;
		text(msg, this._cX, this._cY-width*0.2);
	}

	convert(alphabet){
		let a = alphabet;
		// Forward
		for(let i=0; i<this._roters.length; i++){
			a = this._roters[i].convert(a, "red");
		}
		// Reflector
		a = this._roters[this._roters.length-1].reflect(a, "green");
		// Backward
		for(let i=this._roters.length-1; 0<=i; i--){
			a = this._roters[i].convert(a, "blue");
		}
		return a;
	}

	reset(){
		// Reset
		this._roters[0].reset(ALPHABETS, ROT_A);
		this._roters[1].reset(ALPHABETS, ROT_B);
		this._roters[2].reset(ALPHABETS, ROT_C);
	}
}

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

		fill(0);
		stroke(100);
		strokeWeight(4);
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

		if(color == 100) return;
		this.drawArrow(pB);
	}

	drawArrow(pos){
		const len = 10;
		const dC = atan2(this._cY-pos.y, this._cX-pos.x);
		const dL = dC - 30;
		const dR = dC + 30;
		const lX = pos.x + len * cos(dL);
		const lY = pos.y + len * sin(dL);
		line(pos.x, pos.y, lX, lY);
		const rX = pos.x + len * cos(dR);
		const rY = pos.y + len * sin(dR);
		line(pos.x, pos.y, rX, rY);
	}

	drawAlphabet(len, i){
		fill(255);
		noStroke();
		const x = this._cX + len * cos(i*this._pad);
		const y = this._cY + len * sin(i*this._pad);
		text(this._alp[i], x, y);
	}

	convert(alphabet, color){

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
