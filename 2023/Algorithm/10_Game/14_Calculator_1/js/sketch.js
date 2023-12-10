"use strict";

//==========
// JavaScript

const ST_VAL1 = 1;// 値1状態
const ST_VAL2 = 2;// 値2状態

let state, val1, val2, op;

// Window
window.onload = (e)=>{
	
	// UI
	const btns = document.getElementsByTagName("button");
	for(let btn of btns){
		// Buttons
		btn.addEventListener("click", (e)=>{
			onClick(e.target.textContent);
		});
	}

	clear();// Clear
	show(); // Show
}

// アクション
function onClick(value){
	//console.log("onClick:", value);

	// 数値1状態
	if(state == ST_VAL1){
		if(isNumeric(value)){// 数値の場合
			val1 += value;
			if(1 < val1.length && val1[0] == 0) val1 = val1.substr(1);
		}
		if(isFlg(value)){// +-反転の場合
			val1 = changeFlg(val1);// 符号反転
		}
		if(isOperator(value)){// 演算子の場合
			op = value;
			state = ST_VAL2;// 数値2状態へ
		}
		if(isClear(value)){// Cボタン
			clear();
		}
		show();// Show
		return;
	}

	// 数値2状態
	if(state == ST_VAL2){
		if(isNumeric(value)){// 数値の場合
			val2 += value;
			if(1 < val2.length && val2[0] == 0) val2 = val2.substr(1);
		}
		if(isFlg(value)){// +-反転の場合
			if(val2.length <= 0){
				val1 = changeFlg(val1);
			}else{
				val2 = changeFlg(val2);
			}
		}
		if(isOperator(value)){// 演算子の場合
			if(val2.length <= 0){
				op = value;
			}else{
				val1 = calc(val1, val2, op).toString();// 計算処理
				val2 = "";
				op   = value;
			}
		}
		if(isEqual(value)){// =の場合
			val1 = calc(val1, val2, op).toString();// 計算処理
			val2 = "";
			op   = "";
			state = ST_VAL1;// 数値1状態へ
		}
		if(isClear(value)){// Cボタン
			clear();
		}
		show();// Show
		return;
	}
}

// クリア
function clear(){
	state = ST_VAL1;
	val1  = "0";
	val2  = "";
	op    = "";
}

// 表示
function show(){
	console.log("state:", state);
	const disp = document.getElementById("disp");
	let text = "";
	if(state == ST_VAL1) text = val1;
	if(state == ST_VAL2) text = (val2.length<=0) ? val1:val2;
	disp.textContent = text;
}

// 計算処理
function calc(v1, v2, op){
	const n1 = parseInt(v1);
	const n2 = parseInt(v2);
	if(op == "+") return n1 + n2;
	if(op == "-") return n1 - n2;
	if(op == "*") return n1 * n2;
	if(op == "/" && n2 != 0) return n1 / n2;
	return 0;
}

// 数値かどうか
function isNumeric(n){
	return !isNaN(n);
}

// 演算子かどうか
function isOperator(op){
	if(op == "+") return true;
	if(op == "-") return true;
	if(op == "*") return true;
	if(op == "/") return true;
	return false;
}

// =かどうか
function isEqual(e){
	return e == "=";
}

// Clearかどうか
function isClear(c){
	return c == "C";
}

// フラグかどうか
function isFlg(op){
	if(op == "+/-") return true;
	return false;
}

// 符号を変更
function changeFlg(n){
	let num = "";
	if(isNumeric(n[0])){
		num = "-" + n;
	}else{
		num = n.substr(1);
	}
	return num;
}
