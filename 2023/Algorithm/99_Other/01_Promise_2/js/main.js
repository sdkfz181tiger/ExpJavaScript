console.log("Hello, JavaScript!!");

// Promise基礎_2

// Window
window.onload = (e)=>{

	// Sequencial
	actionHop()
			.then(res=>actionStep())
			.then(res=>actionJump())
			.catch(err=>console.log("Error:" + err));
}

function actionHop(){
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			console.log("Hop!!");
			resolve();
			//reject("Rejected:Hop...");
		}, 1000);
	});
}

function actionStep(){
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			console.log("Step!!");
			resolve();
			//reject("Rejected:Step...");
		}, 1000);
	});
}

function actionJump(){
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			console.log("Jump!!");
			resolve();
			//reject("Rejected:Jump...");
		}, 1000);
	});
}