"use strict";

//==========
// 可逆圧縮アルゴリズム1
// LZ77(Sliding Window方式)

function encode(str){

	let encoded = "";
	let sw = "";// Sliding Window
	while(0 < str.length){
		const com = compareSW(sw, str);// Sliding Windowと比較
		const bef = com[0];// x文字前
		const cnt = com[1];// y文字数
		if(bef<0 || cnt<=1){// マッチしない場合は1文字コピー
			encoded += str[0];
			sw += str[0];// Sliding Windowに文字をシフト
			str = str.substring(1);// 対象文字もシフト
		}else{// マッチする場合はその位置(x文字前)と文字数をコピー
			encoded += "[" + bef + "," + cnt + "]";
			sw += str.slice(0, cnt);// 移動する文字列
			str = str.substring(cnt);// スキップ
		}
	}
	return encoded;
}

function decode(str){

	let decoded = "";
	const marks = getMarks(str);// 圧縮文字の場所を取得
	let i = 0;
	while(i < str.length){
		const c = str[i];
		if(c !== "["){
			decoded += c;// 1文字コピー
		}else{
			if(0 < marks.length){
				const mark = marks.shift();
				const from = decoded.length - parseInt(mark[1]);// x文字前
				const to = from + parseInt(mark[2]);// y文字分
				decoded += decoded.substring(from, to);
				i += mark[0].length-1;// スキップ
			}
		}
		i++;
	}
	return decoded;
}

function compareSW(sw, str){
	
	for(let i=sw.length-1; 0<=i; i--){// swの右側から走査
		if(sw[i] !== str[0]) continue;// 一致しなければ継続
		let cnt = 0;
		for(let j=0; i+j<sw.length; j++){// 何文字一致するかカウント
			if(sw[i+j] !== str[j]) break;
			cnt++;// 一致する文字数をカウントアップ
		}
		return [sw.length-i, cnt];// x文字前, y文字数
	}
	return [-1, 0];// 一致する場所無し
}

function getMarks(str){
	const pattern = /\[(\d+),(\d+)\]/g;
	const marks = [];
	let match;
	while((match = pattern.exec(str)) !== null){
		marks.push(match);
	}
	return marks;
}

// 圧縮対象の文字列
const str = "abcdefgabcdefgpqrstuvwxyzstuvwxabcdefgpqrstuvabcdef";
console.log("圧縮前:", str, ":", str.length, "byte");
const encoded = encode(str);// 文字列を圧縮する
console.log("圧縮後:", encoded, ":", encoded.length, "byte");
const decoded = decode(encoded);// 文字列を解凍する
console.log("解凍後:", decoded, ":", decoded.length, "byte");
console.log("確認:", str == decoded);