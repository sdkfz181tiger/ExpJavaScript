console.log("Hello, JavaScript!!");

// ハミング符号を使う
//    (上位4bitを情報bit、下位3bitを符号bitとする)

// 各bitの格納位置(アドレス) 下位3bitは100,010,001とする事
const ADDR = ["111", "110", "101", "011", "100", "010", "001"];

//==========
// 1-1, 送信データ
let msgFrom = ("0000" + "1101").slice(-4);
console.log("原本データ:", msgFrom);

// 1-2, bitが1になっているアドレスを調べる
let arr1 = [];
for(let i=0; i<msgFrom.length; i++){
	if(msgFrom[i] == "1") arr1.push(ADDR[i]);
}

// 1-3, XOR演算をする
let xor1 = parseInt(arr1[0], 2);
for(let i=1; i<arr1.length; i++) xor1 ^= parseInt(arr1[i], 2);
xor1 = ("000" + xor1.toString(2)).slice(-3);
msgFrom += xor1;// ハミング符号
console.log("xor1:", xor1.toString(2));
console.log("送信データ:", msgFrom);

//==========
// 2-1, 受信データ(1bit誤りがあるとする)
let rdm = Math.floor(msgFrom.length * Math.random());
let c = (msgFrom[rdm]=="0") ? "1":"0";// 1bit反転
let l = msgFrom.substring(0, rdm);
let r = msgFrom.substring(rdm+1);
let msgTo = l + c + r;
console.log("受信データ:", msgTo);

// 2-2, bitが1になっているアドレスを調べる
let arr2 = [];
for(let i=0; i<msgTo.length; i++){
	if(msgTo[i] == "1") arr2.push(ADDR[i]);
}

// 2-3, XOR演算をする(エラーがなければ000になる筈...)
let xor2 = parseInt(arr2[0], 2);
for(let i=1; i<arr2.length; i++) xor2 ^= parseInt(arr2[i], 2);
xor2 = ("000" + xor2.toString(2)).slice(-3);
console.log("xor2:", xor2);

// 2-4, エラー箇所を表示する
for(let i=0; i<ADDR.length; i++){
	if(xor2 != ADDR[i]) continue;
	console.log("エラー箇所:", (i+1), "bit目にエラーがあります")
}