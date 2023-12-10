"use strict";

//==========
// 可逆圧縮アルゴリズム3
// ハフマン符号

// ノードクラス
class Node{

	constructor(k, f, c, b){
		this._key      = k;// 文字
		this._freq     = f;// 出現頻度の和
		this._children = c;// 子ノードの番号
		this._bits     = b;// ビット文字列
	}
	get key(){return this._key;}
	get freq(){return this._freq;}
	get children(){return this._children;}
	get bits(){return this._bits;}
	set bits(b){this._bits = b;}
}

// 出現頻度を計算する
function checkFrequency(str){
	const map = {};
	for(let c of str){
		if(map[c] == undefined){
			map[c] = 1;
		}else{
			map[c]++;
		}
	}
	return map;
}

// 出現頻度に基づくキューを作る
function createQueue(map){
	const queue = [];
	for(let key in map){
		const node = new Node(key, map[key], [], "");
		queue.push(node);
	}
	queue.sort((a, b)=>a.freq > b.freq);// 出現頻度順に整列
	return queue;
}

// 出現頻度の低い2つのノードを繋ぐ
function connectNodes(queue, tree){

	const a = queue[0];
	const b = queue[1];
	tree.push(a);// ハフマン木に追加
	tree.push(b);

	const freq = a.freq + b.freq;
	const node = new Node(null, freq, [a, b], "");// 親ノード
	queue.push(node);
	queue.splice(0, 2);// 2つのノードを削除
	queue.sort((a, b)=>a.freq > b.freq);// 出現頻度順に整列
	if(queue.length < 2){
		tree.push(queue[0]);// ルートノード
		return tree;
	}
	return connectNodes(queue, tree);
}

// ハフマン木を構成する
function createHuffman(str){
	const map = checkFrequency(str);     // 出現頻度を計算する
	const queue = createQueue(map);      // 出現頻度に基づくキューを作る
	const tree = connectNodes(queue, []);// ハフマン木を構成する
	parseTree(tree[tree.length-1], "");  // 符号を確定させる
	const dict = {};
	for(let node of tree){
		if(node.key == null) continue;
		dict[node.key] = node.bits;
	}
	return dict;
}

function parseTree(node, bits){
	if(node.children.length <= 0){
		node.bits = bits;// 符号の確定
		return;
	}
	for(let i=0; i<node.children.length; i++){
		parseTree(node.children[i], bits+i);
	}
}

function encode(str, dict){
	let result = "";
	for(let c of str) result += dict[c];
	return result;
}

function decode(str, dict){
	let result = "";
	let i = 0;
	while(i < str.length){
		for(let key in dict){
			if(str.startsWith(dict[key], i)){
				result += key;
				i += dict[key].length;
				break;
			}
		}
	}
	return result;
}

// 圧縮対象の文字列
const str = "abcdefgabcdefgpqrstuvwxyzstuvwxabcdefgpqrstuvabcdef";
console.log("圧縮前:", str, ":", str.length, "byte");
const dict = createHuffman(str);// 符号辞書を作る
console.log("辞書:", dict);
const encoded = encode(str, dict);// 文字列を符号に変換する
console.log("圧縮後:", encoded, ":", encoded.length/8, "byte");
const decoded = decode(encoded, dict);// 符号から文字列に変換する
console.log("解凍後:", decoded, ":", decoded.length, "byte");
console.log("確認:", str == decoded);