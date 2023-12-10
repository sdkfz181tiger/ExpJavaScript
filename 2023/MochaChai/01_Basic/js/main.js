console.log("Hello, JavaScript!!");

// Mocha/Chai

// Window
window.onload = (e)=>{
	console.log("Hello Mocha/Chai!!");

	// Mocha
	mocha.setup("bdd");
	describe("ユニットテスト", ()=>{
		
		it("doSomething関数のテスト1", ()=>{
			// Chai
			chai.assert.isTrue(doSomething());// Trueが返る筈
			//chai.assert.isFalse(doSomething());// Falseが返る筈
		});
		
		it("doSomething関数のテスト2", ()=>{
			// Chai
			//chai.assert.isTrue(doSomething());// Trueが返る筈
			chai.assert.isFalse(doSomething());// Falseが返る筈
		});
	});
	mocha.checkLeaks();
	mocha.run();
}

// Test
function doSomething(){
	return true;
}