console.log("Hello, JavaScript!!");

// Promise基礎_1

// Window
window.onload = (e)=>{

	// Promises
	const pr1 = new Promise((resolve, reject)=>{
		setTimeout(()=>{resolve("Completed1!!");}, 1000);
		//setTimeout(()=>{reject("Error1...");}, 1000);
	});

	const pr2 = new Promise((resolve, reject)=>{
		setTimeout(()=>{resolve("Completed2!!");}, 1000);
		//setTimeout(()=>{reject("Error2...");}, 1000);
	});

	const pr3 = new Promise((resolve, reject)=>{
		setTimeout(()=>{resolve("Completed3!!");}, 1000);
		//setTimeout(()=>{reject("Error3...");}, 1000);
	});

	// Promise(single)
	pr1.then(res=>{
		console.log("then:", res);
	}).catch(err=>{
		console.log("catch:", err);
	});

	// Promise(all)
	Promise.all([pr1, pr2, pr3]).then(res=>{
		console.log("All completed!!");
		for(let r of res) console.log(r);
	}).catch(err=>{
		console.log("Something went wrong...");
		console.log(err);
	});

	// Using Axios
	const URL_WEATHER = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
	const option = {responseType: "blob"};
	const ax1 = axios.get(URL_WEATHER + "210000.json", option);// 岐阜
	const ax2 = axios.get(URL_WEATHER + "240000.json", option);// 三重
	const ax3 = axios.get(URL_WEATHER + "230000.json", option);// 愛知
	
	Promise.all([ax1, ax2, ax3]).then(res=>{
		console.log("All completed!!");
		for(let r of res) console.log(r);
	}).catch(err=>{
		console.log("Something went wrong...");
		console.log(err);
	});
}