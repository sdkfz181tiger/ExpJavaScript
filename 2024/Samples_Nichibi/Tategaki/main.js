console.log("main.js!!");

/*
// 文章を縦書きにして画像に変換する
*/

// Ready
$(document).ready(()=>{
	console.log("Ready!!");

	//==========
	// 1, CSSで縦書きに変換

	// テキストデータを取得
	const text = $("#target").text();
	// 改行コードで分割し、空文字を除去
	const lines = text.split("\n").filter(str=>0<str.length && str!="\t");
	// 改行コードで連結
	$("#target").html(lines.join("<br/>"));

	//==========
	// 2, Div要素を画像に変換する
	$("#my_btn").click(()=>{
		console.log("Click!!");

		// dom-to-imageライブラリを使いましょう
		// URL: https://github.com/tsayen/dom-to-image
		const node = document.getElementById("target");
		domtoimage.toPng(node).then(dataUrl=>{
				const img = new Image();
				img.src = dataUrl;
				document.body.appendChild(img);
			}).catch(err=>{
				console.error("OMG... Something went wrong!!", error);
			});
	});
});