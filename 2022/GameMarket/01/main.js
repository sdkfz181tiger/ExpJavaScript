console.log("main.js!!");

let total = 0;

const products = [
	{"id": "01", "name": "ダイシル", "src": "./images/dicilx1.png", "price": 100, "quantity": 0, "comment": ""},
	{"id": "02", "name": "ダイシルx3", "src": "./images/dicilx3.png", "price": 300, "quantity": 0, "comment": "下敷きor消しゴム"},
	{"id": "03", "name": "まっくらダンジョン", "src": "./images/makkura.png", "price": 1000, "quantity": 0, "comment": ""},
	{"id": "04", "name": "貴族の屋敷", "src": "./images/kizoku.png", "price": 200, "quantity": 0, "comment": ""},
	{"id": "05", "name": "ねっこの迷宮", "src": "./images/nekko.png", "price": 200, "quantity": 0, "comment": ""},
	{"id": "06", "name": "もじんとり", "src": "./images/mojintori.png", "price": 500, "quantity": 0, "comment": ""},
	{"id": "07", "name": "コロコロてりとり", "src": "./images/korokoro.png", "price": 500, "quantity": 0, "comment": ""},
	{"id": "08", "name": "コロペンクエスト", "src": "./images/koropen.png","price": 1000, "quantity": 0, "comment": ""},
	{"id": "09", "name": "Knights of Feather", "src": "./images/knights.png", "price": 2000, "quantity": 0, "comment": ""},
	{"id": "10", "name": "文字禍ウント", "src": "./images/mojikaunt.png", "price": 600, "quantity": 0, "comment": ""},
	{"id": "11", "name": "イメー字", "src": "./images/imeji.png", "price": 500, "quantity": 0, "comment": ""}
]

let sound = null;

// Ready
$(document).ready(()=>{
	console.log("Ready!!");
	refleshTable();// Reflesh

	sound = new Howl({
		src: "./sounds/register.mp3",
		loop: false,
		volume: 1.0
	});

	// Save
	$("#save").click(()=>{
		sound.play();
		saveSales();
	});
});

function createImg(src){
	return $("<img>").attr("src", src);
}

function createBtnPlus(index){
	const btnPlus = $("<button>").attr("index", index).append("+");
	btnPlus.click((e)=>{
		const index = btnPlus.attr("index");
		products[index]["quantity"]++;
		refleshTable();// Reflesh
	});
	return btnPlus
}

function createBtnMinus(index){
	const btnMinus = $("<button>").attr("index", index).append("-");
	btnMinus.click((e)=>{
		const index = btnMinus.attr("index");
		products[index]["quantity"]--;
		if(products[index]["quantity"] < 0) products[index]["quantity"] = 0;
		refleshTable();// Reflesh
	});
	return btnMinus
}

function refleshTable(){
	$("#total").empty();
	$("#lineup").empty();
	total = 0;// Total
	const lineup = $("#lineup");// Table
	
	// Products
	for(let i=0; i<products.length; i++){
		const product = products[i];
		const price = product["price"] * product["quantity"];
		const tr = $("<tr>");
		tr.attr("index", i);
		tr.attr("id", product["id"]);
		tr.append($("<td>").append(product["id"]));
		tr.append($("<td>").append(product["name"]));
		tr.append($("<td>").append(createImg(product["src"])));
		tr.append($("<td>").append("¥" + product["price"]));
		tr.append($("<td>").append(product["quantity"]));
		tr.append($("<td>").append(createBtnPlus(i)));
		tr.append($("<td>").append(createBtnMinus(i)));
		tr.append($("<td>").append("¥" + price));
		tr.append($("<td>").append(product["comment"]));
		lineup.append(tr);
		// Total
		total += price;
	}

	// Total
	$("#total").append("合計金額は¥" + total + "になります");
}

function saveSales(){
	const key = "sales";
	if(!localStorage.getItem(key)){
		localStorage.setItem(key, JSON.stringify([]));
	}
	const arr = JSON.parse(localStorage.getItem(key));
	const date = new Date();
	const time = date.toTimeString();
	const json = {"time": time, "products": products}
	arr.push(json);
	localStorage.setItem(key, JSON.stringify(arr));
	// Count
	$("#save").text("Save:" + arr.length);
}
