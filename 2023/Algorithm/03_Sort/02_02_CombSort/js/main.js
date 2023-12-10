console.log("Hello, JavaScript!!");

// コームソート

// 配列にランダム値を入れる
let numbers = [];
for(let i=0; i<10; i++){
	numbers.push(Math.floor(Math.random() * 30));
}

console.log(numbers);
let counter = 0;// カウンタ

let off = Math.floor(numbers.length / 1.3);// 比較の間隔
while(true){

	let flg = false;// 入れ替えを行なったかどうかを判断
	for(let i=0; i<numbers.length - off; i++){
		if(numbers[i+off] < numbers[i]){
			swap(i, i+off);
			flg = true;// 入れ替えを行なった場合はtrueに
		}
		counter++;// 比較回数をカウント
		console.log("配列: [" + numbers.toString() + "]");
	}
	if(off == 1 && flg) break;// 比較の間隔が1で入れ替えを行わなかった場合
	off = Math.floor(off / 1.3);// 間隔を狭くする
	if(off <= 0) off = 1;// 間隔を調整
}
console.log(numbers);
console.log("比較回数:", counter);

function swap(a, b){
	let tmp    = numbers[a];
	numbers[a] = numbers[b];
	numbers[b] = tmp;
}