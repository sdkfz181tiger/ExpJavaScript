console.log("Hello Kuromoji!!");

const DICT_PATH = "./dict";
const story = "昔々、あるところにお爺さんとお婆さんが住んでいたそうな。お爺さんは山へ芝刈りに、お婆さんは川へ洗濯に向かいましたとさ。すると、川上からどんぶらこどんぶらこと大きな桃が流れてきました。";

// Main
window.onload = (e)=>{

	const ids = [];
	const names = [];

	// Kuromoji
	kuromoji.builder({dicPath: DICT_PATH}).build((err, tokenizer)=>{
		const tokens = tokenizer.tokenize(story);
		tokens.forEach((token)=>{
			console.log(token);
			if(token.pos == "名詞" && token.pos_detail_1 == "一般"){
				ids.push(token.word_id);
				names.push(token.surface_form);
			}
		});
		makeAnotherStory(tokens, ids, names);
	});
}

function makeAnotherStory(tokens, ids, names){
	shuffle(names);

	const story = [];
	tokens.forEach((token)=>{
		const id = token.word_id;
		const find = ids.findIndex((elem)=>elem==id);
		if(find < 0){
			story.push(token.surface_form);
		}else{
			story.push(names.pop());
		}
	});

	console.log(story.join(""));
}

function shuffle(arr){
	for(let i=arr.length-1; 0<i; i--){
		const r = Math.floor(Math.random() * i);
		const tmp = arr[r];
		arr[r] = arr[i];
		arr[i] = tmp;
	}
}