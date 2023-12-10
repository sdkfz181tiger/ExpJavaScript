"use strict";

// ジャンケンの勝敗を判定する1(判定処理だけを使う)

{
	console.log("=判定処理だけを使う場合=");

	// 1, ジャンケンの手
	const JANKEN = ["グー", "チョキ", "パー"];

	// 2, ランダムで手を確定
	const you = Math.floor(Math.random() * 3) + 1;// 1, 2, 3
	const com = Math.floor(Math.random() * 3) + 1;// 1, 2, 3
	console.log("You:", you, JANKEN[you-1], "vs", "Com:", com, JANKEN[com-1]);

	// 3, 判定処理(敢えてバラバラにしてありますw)
	if(you == com){
		console.log("あいこです");
	}
	if(you==1 && you==3 || you==2 && com==1 || you==3 && com==2){
		console.log("あなたの負けです...");
	}
	if(you==1 && com==2 || you==2 && com==3 || you==3 && com==1){
		console.log("あなたの勝ちです!!");
	}
}

//==========
// ジャンケンの勝敗を判定する2(計算する場合)

{
	console.log("=計算をする場合=");

	// 1, ジャンケンの手
	const JANKEN = ["グー", "チョキ", "パー"];

	// 2, ランダムで手を確定
	const you = Math.floor(Math.random() * 3) + 1;// 1, 2, 3
	const com = Math.floor(Math.random() * 3) + 1;// 1, 2, 3
	console.log("You:", you, JANKEN[you-1], "vs", "Com:", com, JANKEN[com-1]);

	// 3, YouとComとの差に3を加算し、3で割った余りを計算
	const result = (you - com + 3) % 3;
	console.log("result:", result);

	// 4, 判定処理(敢えてバラバラにしてありますw)
	if(result == 0){
		console.log("あいこです:", result);
	}
	if(result == 1){
		console.log("あなたの負けです...");
	}
	if(result == 2){
		console.log("あなたの勝ちです!!");
	}
}

//==========
// ジャンケンの勝敗を判定する3(デシジョンテーブル)

{
	console.log("=デシジョンテーブルを使う場合=");

	// 1, ジャンケンの手
	const JANKEN = ["グー", "チョキ", "パー"];

	// 2, デシジョンテーブルに格納する定数
	const DRAW = 0;// あいこ
	const WIN  = 1;// 勝ち
	const LOSE = 2;// 負け

	// 3, デシジョンテーブルを用意する
	const TABLE = [
		[DRAW, WIN, LOSE],
		[LOSE, DRAW, WIN],
		[WIN, LOSE, DRAW]
	];

	// 4, ランダムで手を確定
	const you = Math.floor(Math.random() * 3);
	const com = Math.floor(Math.random() * 3);
	console.log("You:", you, JANKEN[you], "vs", "Com:", com, JANKEN[com]);

	// 5, デシジョンテーブルから結果を取得
	const result = TABLE[you][com];
	console.log("result:", result);

	// 6, 判定処理(敢えてバラバラにしてありますw)
	if(result == DRAW){
		console.log("あいこです:", result);
	}
	if(result == LOSE){
		console.log("あなたの負けです...");
	}
	if(result == WIN){
		console.log("あなたの勝ちです!!");
	}
}