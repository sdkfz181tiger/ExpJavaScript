console.log("Hello, JavaScript!!");

// ハミング符号を使う

// 送信データを作る
const data = createData("0101");
console.log("送信データ:", data);

// 受信データを作る
const err = createErr(data);
console.log("受信データ:", err);

// データをチェックする
const result = checkData(err);
if(result == 0){
	console.log("エラーはありません");
}else if(0 < result){
	console.log(result + "桁目にエラーがあります");
}else{
	console.log("エラー箇所が複数あります");
}

// 送信データを作る
function createData(str){
	//console.log("createData:", str);

	// 2bitに変換
	const x1 = parseBin(str[0]);
	const x2 = parseBin(str[1]);
	const x3 = parseBin(str[2]);
	const x4 = parseBin(str[3]);

	// ハミング符号を計算(XOR)
	const p1 = x1 ^ x3 ^ x4;
	const p2 = x1 ^ x2 ^ x4;
	const p3 = x1 ^ x2 ^ x3;
	console.log("ハミング符号:", p1, p2, p3);

	// ハミング符号を連結
	const hum = p1.toString(2) + p2.toString(2) + p3.toString(2);
	return str + hum;
}

// 1文字を2bitに変換
function parseBin(c){
	const num = parseInt(c);// 数値に変換
	const bin = parseInt(num.toString(2));// 2bitに変換
	return bin;
}

// 1bit誤ったデータを作る
function createErr(data){
	const rdm = Math.floor(Math.random()*data.length);
	const bit = (data[rdm] == "0") ? "1":"0";// 1bit反転
	const err = data.slice(0, rdm) + bit + data.slice(rdm+1);
	return err;
}

// 受信データをチェックする
function checkData(str){
	//console.log("checkData:", str);

	// 2bitに変換
	const x1 = parseBin(str[0]);
	const x2 = parseBin(str[1]);
	const x3 = parseBin(str[2]);
	const x4 = parseBin(str[3]);
	const p1 = parseBin(str[4]);
	const p2 = parseBin(str[5]);
	const p3 = parseBin(str[6]);

	const s1 = x1 ^ x3 ^ x4 ^ p1;
	const s2 = x1 ^ x2 ^ x4 ^ p2;
	const s3 = x1 ^ x2 ^ x3 ^ p3;
	console.log("XOR演算:", s1, s2, s3);

	if(s1==0 && s2==0 && s3==0) return 0;// データ正常
	if(s1==1 && s2==1 && s3==1) return 1;// 1桁目にエラー
	if(s1==0 && s2==1 && s3==1) return 2;
	if(s1==1 && s2==0 && s3==1) return 3;
	if(s1==1 && s2==1 && s3==0) return 4;
	if(s1==1 && s2==0 && s3==0) return 5;
	if(s1==0 && s2==1 && s3==0) return 6;
	if(s1==0 && s2==0 && s3==1) return 7;
	return -1;// 2箇所以上のエラー
}