console.log("main.js!!");

// 背景の準備
function setScenery(){
	console.log("setScenery");
	setSceneryRoot();
	setSceneryNote();
}

//==========
// モデリングデータの使い方
// MagicaVoxel参考動画
//     https://www.youtube.com/watch?v=MQPENfEOJJg
//
// 1, 3Dモデリングデータは、./models/obj/フォルダに格納しよう
// 2, モデルデータの読み込みは、"data.js"に記述しよう(models)
// 3, 背景に配置する場合は"setSceneryRoot()"関数に記述しよう
// 4, 譜面に配置する場合は"setSceneryNote()"関数に記述しよう

//==========
// サウンドデータの使い方
//
// 1, サウンドデータは、./sounds/フォルダに格納しよう
// 2, モデルデータの読み込みは、"data.js"に記述しよう(sounds)

//==========
// 譜面データの編集の仕方
//
// 1, 譜面データは、"data.js"の(noteData)変数です

//==========
// 背景に配置
function setSceneryRoot(){
	let group = rootGroup;

	// "rootGroup(背景)"に配置する
	let obj1 = objLoader.findModels("8x8x8.obj", 1.0);
	obj1.position.set(0, 0, -30);// 座標をセット
	group.add(obj1);// 背景に追加
}

//==========
// 譜面に配置
function setSceneryNote(){
	let group = noteGroup;

	// "noteGroup(譜面)"に配置する
	let obj1 = objLoader.findModels("8x8x8.obj", 1.0);
	obj1.position.set(0, 5, -30);// 座標をセット
	group.add(obj1);// 譜面に追加
}