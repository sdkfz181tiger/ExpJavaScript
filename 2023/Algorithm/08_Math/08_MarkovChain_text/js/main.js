console.log("Hello, JavaScript!!");

// マルコフ連鎖_文章自動生成

const DICT_PATH = "./dict";
const TEXT_PATH = "./data.txt";

const marcov = {};// マルコフ辞書
const nouns  = [];// 名詞リスト

// Window
window.onload = (e)=>{
	loadText();// Load
}

function loadText(){
	// Axios
	const option = {responseType: "blob"};
	axios.get(TEXT_PATH, option).then(res=>{
		res.data.text().then(str=>{
			buildKuromoji(str.replace(/\r?\n/g, "").trim());
		});
	}).catch(err=>{
		console.log(err);
	});
}

function buildKuromoji(str){
	// Kuromoji
	kuromoji.builder({dicPath: DICT_PATH}).build((err, tokenizer)=>{
		createMarkov(tokenizer.tokenize(str));
	});
}

function createMarkov(tokens){
	// Marcov(クジラ飛行机先生の書籍から)
	for(let i=0; i<tokens.length-2; i++){
		const w1 = tokens[i].surface_form;
		const w2 = tokens[i+1].surface_form;
		const w3 = tokens[i+2].surface_form;
		if(marcov[w1] == undefined) marcov[w1] = {};
		if(marcov[w1][w2] == undefined) marcov[w1][w2] = {};
		if(marcov[w1][w2][w3] == undefined) marcov[w1][w2][w3] = 0;
		marcov[w1][w2][w3]++;
		if(tokens[i].pos == "名詞" && tokens[i+1].pos == "助詞") nouns.push(w1);
	}
	//console.log(marcov);

	// Test
	for(let i=0; i<10; i++){
		createMessage();
	}
}

function createMessage(){
	console.log("createMessage");
	let w1 = nouns[Math.floor(Math.random() * nouns.length)];
	let msg = w1;
	// TODO: カウント数に応じて優先的に選択する
	while(true){
		const keys1 = Object.keys(marcov[w1]);
		const w2 = keys1[Math.floor(Math.random() * keys1.length)];
		const keys2 = Object.keys(marcov[w1][w2]);
		const w3 = keys2[Math.floor(Math.random() * keys2.length)];
		msg += w2;
		if(w2 == "。") break;
		msg += w3;
		if(w3 == "。") break;
		w1 = w3;
	}
	console.log(msg);
}