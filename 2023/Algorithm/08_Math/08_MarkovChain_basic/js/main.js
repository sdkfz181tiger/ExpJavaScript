console.log("Hello, JavaScript!!");

// マルコフ連鎖_明後日の天気予報

// ======確率行列======
// 　　  明晴 明雲 明雨
// 今晴  0.6, 0.3, 0.1
// 今曇  0.3, 0.3, 0.4
// 今雨  0.2, 0.5, 0.3

// Window
window.onload = (e)=>{

	// 確率行列1
	const weather1 = new Matrix3x3();
	weather1.mtx = [
		0.6, 0.3, 0.1,
		0.3, 0.3, 0.4, 
		0.2, 0.5, 0.3
	];
	weather1.print();

	// 確率行列2
	const weather2 = new Matrix3x3();
	weather2.copy(weather1);// Copy
	weather2.print();

	// 遷移確率行列
	weather1.multiply(weather2);// 掛け算
	weather1.print();

	console.log("今日晴、明日晴、明後日晴の確率:", weather1.mtx[0]);
	console.log("今日晴、明日晴、明後日曇の確率:", weather1.mtx[3]);
	console.log("今日晴、明日晴、明後日雨の確率:", weather1.mtx[6]);
}

// Matrix3x3
class Matrix3x3{

	constructor(){
		this._rows = 3;
		this._cols = 3;
		this._size = this._rows * this._cols;
		this._mtx = new Array(this._size).fill(0);
		return this;
	}

	get mtx(){return this._mtx;}
	set mtx(arr){this._mtx = arr;}

	copy(tgt){
		if(!tgt instanceof Matrix3x3) return null;
		for(let i=0; i<this._size; i++){
			this._mtx[i] = tgt.mtx[i];
		}
		return this;
	}

	add(tgt){
		if(!tgt instanceof Matrix3x3) return null;
		for(let i=0; i<this._size; i++){
			this._mtx[i] += tgt.mtx[i];
		}
		return this;
	}

	sub(tgt){
		if(!tgt instanceof Matrix3x3) return null;
		for(let i=0; i<this._size; i++){
			this._mtx[i] -= tgt.mtx[i];
		}
		return this;
	}

	scale(s){
		for(let i=0; i<this._size; i++){
			this._mtx[i] * s;
		}
		return this;
	}

	multiply(tgt){
		if(!tgt instanceof Matrix3x3) return null;
		const tmp = new Matrix3x3();
		for(let i=0; i<this._rows; i++){
			for(let j=0; j<this._cols; j++){
				for(let k=0; k<3; k++){
					tmp.mtx[i*3+j] += this._mtx[i*3+k] * tgt.mtx[k*3+j];
				}
			}
		}
		this._mtx = tmp.mtx;
		return this;
	}

	print(){
		let str = "= Matrix3x3 =\n";
		for(let i=0; i<this._mtx.length; i++){
			this._mtx[i] = Math.floor(this._mtx[i]*100) / 100;
			str += this._mtx[i];
			str += ((i+1)%3 != 0) ? ", ":"\n";
		}
		console.log(str);
	}
}