import { myName, myFunc, MyModule } from "./modules/module.js";

$(document).ready(()=>{
	console.log("Ready!!");

	// Variable
	console.log(myName);

	// Function
	myFunc();

	// Class
	const myModule = new MyModule();
	myModule.sayHello();
	myModule.sayByebye();
	myModule.saySomething("#my_area", "Hello, Module!!");
});