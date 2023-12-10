console.log("Hello, JavaScript!!");

// バケツソート

const TOTAL = 10;

// 乱数の入った配列を用意する
let nums = [];
for(let i=0; i<TOTAL; i++){
	let num = Math.floor(TOTAL * Math.random());
	nums.push(num);
}
console.log(nums);

// 配列数が同じ配列を別に用意し、0で初期化する
let cnt = [];
for(let i=0; i<TOTAL; i++){
	cnt.push(0);
}

// 配列の添字に該当する箇所に+1する
for(let i=0; i<TOTAL; i++){
	cnt[nums[i]] += 1;
}
console.log(cnt);

// 配列を表示する
let arr = [];
for(let i=0; i<TOTAL; i++){
	for(let n=0; n<cnt[i]; n++){
		arr.push(i);
	}
}
console.log(arr);