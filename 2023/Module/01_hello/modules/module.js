export { myName, myFunc, MyModule };

const myName = "Hoge!!";

const myFunc = ()=>{
	console.log("Fuga!!");
}

class MyModule{

	constructor(){
		console.log("MyModule");
	}

	sayHello(){
		console.log("Hello!!");
	}

	sayByebye(){
		console.log("Byebye!!");
	}

	saySomething(selector, txt){
		$(selector).text(txt);
	}
}