console.log("Hello, JavaScript!!");

// Mocha/Chai

// バブルソートを実装する事
const doBubbleSort = (arr)=>{
	const copy = arr.concat();
	for(let i=0; i<copy.length-1; i++){
		for(let j=i+1; j<copy.length; j++){
			if(copy[j] < copy[i]){
				const tmp = copy[i];
				copy[i] = copy[j];
				copy[j] = tmp; 
			}
		}
	}
	return copy;
}

// Window
window.onload = (e)=>{
	console.log("Hello Mocha/Chai!!");
	
	doTest("バブルソート", doBubbleSort, 5);// Test
}