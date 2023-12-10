console.log("Hello, JavaScript!!");

// ノームソート

// 配列にランダム値を入れる
let numbers = [];
for(let i=0; i<10; i++){
	numbers.push(Math.floor(Math.random() * 30));
}

console.log(numbers);
let counter = 0;// カウンタ

let gnome = 0;// ノームの位置

while(gnome < numbers.length){// ノームがインデックス内にある間

	for(let i=gnome; 0<i; i--){// 先頭に向かって比較
		if(numbers[i] < numbers[i-1]){
			swap(i, i-1);
		}
		counter++;
	}
	gnome++;// ノームを一歩進める
	console.log("配列: [" + numbers.toString() + "]");
}

console.log(numbers);
console.log("比較回数:", counter);

function swap(a, b){
	let tmp    = numbers[a];
	numbers[a] = numbers[b];
	numbers[b] = tmp;
}