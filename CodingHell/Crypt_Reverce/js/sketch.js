//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

//==========
// Scratch -> JavaScript
// -> http://ozateck.sakura.ne.jp/wordpress/category/js-x-scratch/

// 逆転
var msg1  = "今日のお昼はカレーを食べました";
console.log(msg1);

// 逆転
var msg2 = reverce(msg1);
console.log(msg2);

// 逆転
var msg3 = reverce(msg2);
console.log(msg3);

// 暗号化(逆転)
function reverce(str){
	var result = "";
	for(var i=str.length-1; 0<=i; i--){
		result += str[i];
	}
	return result;
}