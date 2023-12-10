console.log("Hello, JavaScript!!");

// シェーカーソート

// 配列にランダム値を入れる
let numbers = [];
for(let i=0; i<10; i++){
	numbers.push(Math.floor(Math.random() * 30));
}

console.log(numbers);
let counter = 0;// カウンタ

let head = 0;// 先頭の要素
let tail = numbers.length - 1;// 最後尾の要素
let last = head;// 最後に入れ替えをした場所

while(true){

	// head to tail
	last = head;// 最後に入れ替えをした場所
	for(let i=head; i<tail; i++){
		if(numbers[i+1] < numbers[i]){
			swap(i, i+1);
			last = i + 1;// 入れ替えをした場所
		}
		counter++;// 比較回数をカウント
	}
	tail = last;// 最後尾を狭める

	// tail to head
	last = tail;// 最後に入れ替えをした場所
	for(let i=tail; 0<i; i--){
		if(numbers[i] < numbers[i-1]){
			swap(i-1, i);
			last = i - 1;// 入れ替えをした場所
		}
		counter++;// 比較回数をカウント
	}
	head = last;// 先頭を狭める

	console.log("配列: [" + numbers.toString() + "]");

	if(head == tail) break;
}

console.log(numbers);
console.log("比較回数:", counter);

function swap(a, b){
	let tmp    = numbers[a];
	numbers[a] = numbers[b];
	numbers[b] = tmp;
}