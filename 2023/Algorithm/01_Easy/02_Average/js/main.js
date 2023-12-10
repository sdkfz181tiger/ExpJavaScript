console.log("Hello, JavaScript!!");

// 平均値

let total = 0;

let numbers = [1, 3, 5, 7, 10];

for(let i=0; i<numbers.length; i++){
	total += numbers[i];
}

let average = total / numbers.length;

console.log(average);