console.log("Hello, JavaScript!!");

// バイナリサーチ

// 配列
let arr = [10, 12, 34, 44, 51, 65, 70, 89, 92];
let p = binSearch(arr, 89);
console.log("p:" + p);

function binSearch(arr, target){

	let l = 0;                      // 検索対象の左端
	let r = arr.length - 1;         // 検索対象の右端
	let m = Math.floor((l + r) / 2);// 件宅対象の中央
	let p = -1;                     // 検索結果
	let c = 0;                      // 処理回数

	while(l <= r && p == -1){
		c++;// カウントアップ
		m = Math.floor((l + r) / 2);
		console.log("l:" + l + " r:" + r + " m:" + m);
		if(arr[m] == target){
			p = m;// 検索結果
		}else if(target < arr[m]){
			r = m - 1;
		}else{
			l = m + 1;
		}
	}
	return p;
}