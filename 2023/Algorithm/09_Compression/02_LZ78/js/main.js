"use strict";

//==========
// 可逆圧縮アルゴリズム2
// LZ78(辞書方式)

function createDict(str){

	const dict = [];
	for(let i=0; i<str.length; i++){
		for(let j=i; j<str.length; j++){
			const word = str.substring(i, j+1);
			if(dict.includes(word)) continue;
			dict.push(word);
			i += j-i;
		}
	}
	dict.sort((a, b)=>a.length < b.length);
	return dict;
}

function encode(str, dict){

	const encoded = [];
	for(let i=0; i<str.length; i++){
		const part = str.substring(i);
		for(let d=0; d<dict.length; d++){
			if(part.startsWith(dict[d])){
				encoded.push(d);
				i += dict[d].length - 1;
				break;
			}
		}
	}
	return encoded.join(",");
}

function decode(str, dict){

	const keys = str.split(",");
	let decoded = "";
	for(let key of keys){
		decoded += dict[key];
	}
	return decoded;
}

// 圧縮対象の文字列
const str = "abcdefgabcdefgpqrstuvwxyzstuvwxabcdefgpqrstuvabcdef";
console.log("圧縮前:", str, ":", str.length, "byte");
const dict = createDict(str);// 符号辞書を作る
console.log("辞書:", dict);
const encoded = encode(str, dict);// 文字列を圧縮する
console.log("圧縮後:", encoded, ":", encoded.length, "byte");
const decoded = decode(encoded, dict);// 文字列を解凍する
console.log("解凍後:", decoded, ":", decoded.length, "byte");
console.log("確認:", str == decoded);