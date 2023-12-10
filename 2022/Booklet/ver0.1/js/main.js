// main.js
console.log("main.js!!");

$((e)=>{
	console.log("onload!!");

	// Single book
	$("#mybook").booklet({
		width: 480,        // ページ横幅
		height: 320,       // ページ高さ
		closed: true,      // true:閉じている/false:開いている
		autoCenter: true,  // 中央寄せ_する:true/しない:false
		pageNumbers: true, // ページ番号_表示:true/非表示:false
		//startingPage: 5, // 1ページ目が開いている状態
		pagePadding: 0,    // ページの隙間
		speed: 600,        // ページの速度
		direction: "RTL",  // ページめくり方向:LTR / RTL
	});

	let direction = $("#mybook").booklet("option", "direction");
	console.log("direction:" + direction);
});