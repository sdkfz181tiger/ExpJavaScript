"use strict";

//==========
// グリーディ法で最適解を見つける
//    例:コインの数をなるべく抑えてその総数を算出

let money = 1979;// 金額
const coins  = [500, 100, 50, 10, 5, 1];// コインの種類
const result = [0, 0, 0, 0, 0, 0];// コインの数を格納する
console.log("金額:" + money);

for(let i=0; i<coins.length; i++){
	result[i] += Math.floor(money / coins[i]);// 何枚か計算
	money %= coins[i];// 余りを計算
}

let total = 0;
for(let i=0; i<coins.length; i++){
	console.log(coins[i] + "円硬貨 x " + result[i] + "枚");
	total += result[i];// 合計枚数
}

console.log("合計枚数:" + total);