console.log("Hello, Utility!!");

// Mocha/Chai

function doTest(title, method, times){
	// Mocha
	mocha.setup("bdd");
	describe(title, ()=>{
		// アルゴリズムテスト
		for(let i=0; i<times; i++){
			it("テスト回数:"+(i+1), ()=>{
				const before = createArr();// 乱数を格納した配列
				console.log("整列前:", before);
				const after = method(before);
				console.log("整列後:", after);
				// Chai
				chai.assert.isArray(after);// 配列である事
				chai.assert.isTrue(isSorted(after));// 整列済みである事
			});
		}
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