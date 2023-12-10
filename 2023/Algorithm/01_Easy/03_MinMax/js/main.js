console.log("Hello, JavaScript!!");

// 最小値/最大値

let min = 999;
let max = 0;

let numbers = [1, 9, 5, 16, 10, 7];

for(let i=0; i<numbers.length; i++){

	if(numbers[i] < min){
		min = numbers[i];
	}

	if(max < numbers[i]){
		max = numbers[i];
	}
}

console.log("Min:", min);
console.log("Max:", max);