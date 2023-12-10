console.log("Hello, JavaScript!!");

// Mocha/Chai

// Window
window.onload = (e)=>{
	console.log("Hello Mocha/Chai!!");

	// Mocha
	mocha.setup("bdd");
	describe("ユニットテスト", ()=>{
		it("整列済み判定", ()=>{
			// ソートアルゴリズムテスト
			for(let i=0; i<10; i++){
				// 乱数を格納した配列
				const before = createArr();
				//console.log("Before:", before);
				const after = doSort(before);
				console.log("After:", after);
				// Chai
				chai.assert.isTrue(isSorted(after));// Trueが返る筈
				//chai.assert.isFalse(doSomething());// Falseが返る筈
			}
		});
	});
	mocha.checkLeaks();
	mocha.run();
}

// 乱数を格納した配列を作る
function createArr(){
	const arr = [];
	for(let i=0; i<10; i++){
		arr.push(Math.floor(Math.random()*100));
	}
	return arr;
}

// 整列済み判定関数
function isSorted(arr){
	for(let i=0; i<arr.length-1; i++){
		if(arr[i+1] < arr[i]) return false;
	}
	return true;
}

// バブルソート
function doSort(arr){
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