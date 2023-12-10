"use strict";

//==========
// Utility

const ST_VAL1 = 1;// 値1状態
const ST_VAL2 = 2;// 値2状態

class CalcManager{

	constructor(){
		console.log("CalcManager");

		this._state = null;
		this._val1  = null;
		this._val2  = null;
		this._op    = null;
		this.clear();
	}

	clear(){
		this._state = ST_VAL1;
		this._val1  = "0";
		this._val2  = "";
		this._op    = "";
	}

	put(value){

		// 数値1状態
		if(this._state == ST_VAL1){
			if(this.isNumeric(value)){// 数値の場合
				this._val1 += value;
				if(1 < this._val1.length && this._val1[0] == 0){
					this._val1 = this._val1.substr(1);
				}
			}
			if(this.isFlg(value)){// +-反転の場合
				this._val1 = this.changeFlg(this._val1);// 符号反転
			}
			if(this.isOperator(value)){// 演算子の場合
				this._op = value;
				this._state = ST_VAL2;// 数値2状態へ
			}
			if(this.isClear(value)){// Cボタン
				this.clear();
			}

			if(this._state == ST_VAL1) return this._val1;
			if(this._state == ST_VAL2) return (this._val2.length<=0)?this._val1:this._val2;
			return null;
		}

		// 数値2状態
		if(this._state == ST_VAL2){
			if(this.isNumeric(value)){// 数値の場合
				this._val2 += value;
				if(1 < this._val2.length && this._val2[0] == 0){
					this._val2 = this._val2.substr(1);
				}
			}
			if(this.isFlg(value)){// +-反転の場合
				if(this._val2.length <= 0){
					this._val1 = this.changeFlg(this._val1);
				}else{
					this._val2 = this.changeFlg(this._val2);
				}
			}
			if(this.isOperator(value)){// 演算子の場合
				if(this._val2.length <= 0){
					this._op = value;
				}else{
					this._val1 = this.calc(this._val1, this._val2, this._op).toString();// 計算処理
					this._val2 = "";
					this._op   = value;
				}
			}
			if(this.isEqual(value)){// =の場合
				this._val1 = this.calc(this._val1, this._val2, this._op).toString();// 計算処理
				this._val2 = "";
				this._op   = "";
				this._state = ST_VAL1;// 数値1状態へ
			}
			if(this.isClear(value)){// Cボタン
				this.clear();
			}
			
			if(this._state == ST_VAL1) return this._val1;
			if(this._state == ST_VAL2) return (this._val2.length<=0)?this._val1:this._val2;
			return null;
		}

		return null;
	}

	calc(v1, v2, op){
		const n1 = parseInt(v1);
		const n2 = parseInt(v2);
		if(op == "+") return n1 + n2;
		if(op == "-") return n1 - n2;
		if(op == "*") return n1 * n2;
		if(op == "/" && n2 != 0) return n1 / n2;
		return 0;
	}

	isNumeric(n){
		return !isNaN(n);
	}

	isOperator(op){
		if(op == "+") return true;
		if(op == "-") return true;
		if(op == "*") return true;
		if(op == "/") return true;
		return false;
	}

	isEqual(e){
		return e == "=";
	}

	isClear(c){
		return c == "C";
	}

	isFlg(op){
		if(op == "+/-") return true;
		return false;
	}

	changeFlg(n){
		let num = "";
		if(this.isNumeric(n[0])){
			num = "-" + n;
		}else{
			num = n.substr(1);
		}
		return num;
	}
}