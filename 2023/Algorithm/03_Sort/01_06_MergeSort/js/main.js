console.log("Hello, JavaScript!!");

// マージソート

const data = [91, 86, 72, 45, 69, 24, 55, 1, 12];
mergeSort(data);
console.log("Result:", data);

// 分割処理
function mergeSort(list){

	if(list.length < 2) return;// 要素が2未満

	// 左半分に分割
	const num1 = Math.floor(list.length / 2);
	const slist1 = new Array(num1).fill(-1);
	for(let i=0; i<num1; i++){
		slist1[i] = list[i];
	}

	// 右半分に分割
	const num2 = list.length - num1;
	const slist2 = new Array(num2).fill(-1);
	for(let i=0; i<num2; i++){
		slist2[i] = list[num1 + i];
	}

	mergeSort(slist1);// 再帰処理
	mergeSort(slist2);// 再帰処理
	merge(slist1, slist2, list);// 結合処理
}

// 結合処理
function merge(slist1, slist2, list){

	let i = 0;
	let j = 0;
	const num1 = slist1.length;
	const num2 = slist2.length;

	// slist1, slist2の両方に要素が残っている場合
	while(i < num1 && j < num2){
		// slist1とslist2の要素を比較して小さい方をlistに追加
		if(slist1[i] < slist2[j]){
			list[i+j] = slist1[i];
			i++;
		}else{
			list[i+j] = slist2[j];
			j++;
		}
	}

	// slist1, slist2のいずれかに要素が残っている場合
	while(i < num1 || j < num2){
		if(i < num1){
			list[i+j] = slist1[i];
			i++;
		}else{
			list[i+j] = slist2[j];
			j++;
		}
	}
}