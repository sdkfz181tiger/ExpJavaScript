console.log("Hello, JavaScript!!");

// 0 ~ 9までの整数からランダムで数値を2つ選択する

// 1, 乱数を使って計算する

{
	const NUM  = 10;
	const rdm1 = Math.floor(Math.random()*NUM);
	const off1 = Math.floor(Math.random()*(NUM-1));
	const rdm2 = (rdm1 + off1 + 1) % NUM;
	console.log("ランダム:", rdm1, rdm2);
}

// 2, 配列を使ってシャッフルする

{
	const NUM  = 10;
	const arr = [];
	for(let i=0; i<NUM; i++) arr.push(i);
	for(let i=arr.length-1; 0<=i; i--){
		const rdm = Math.floor(Math.random()*i);
		const tmp = arr[rdm];
		arr[rdm] = arr[i];
		arr[i] = tmp;
	}
	console.log("ランダム:", arr[0], arr[1]);
}