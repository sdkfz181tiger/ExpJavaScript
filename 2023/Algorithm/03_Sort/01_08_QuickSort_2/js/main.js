console.log("Hello, JavaScript!!");

// クィックソート

const data = [91, 86, 72, 45, 69, 24, 55, 1, 12];
quickSort(0, data.length-1);
console.log("Result:", data);

function quickSort(min, max){

	const p = findPivot(min, max);// ピボットを選択して格納位置を取得
	if(p < 0) return;// 全て同じ数値の場合

	const pivot = data[p];// ピボットを取得
	const r = arrange(min, max, pivot);// ピボット位置の右側の位置
	const l = r - 1;// ピボット位置の左側の位置
	quickSort(min, l);// 左側を再帰処理
	quickSort(r, max);// 右側を再帰処理
}

function findPivot(min, max){

	let pivot = data[min];// minの位置にある値
	let k = min + 1;// minの右隣

	while(k <= max){

		if(data[k] == pivot){// kの位置とpivotを比較
			k++;// kを一つ進める
			continue;
		}

		// kにある値がpivotより大きい場合はkを、
		// kにある値がpivot以下の場合はminを選択する
		if(pivot < data[k]){
			return k;// kの位置
		}else{// pivotがkにある値以下の場合
			return min;// minの位置
		}
	}

	return -1;// 全て同じ数値の場合
}

function arrange(min ,max, pivot){

	while(min <= max){// minとmaxの間隔を狭めながら

		// 交換処理
		let tmp = data[min];
		data[min] = data[max];
		data[max] = tmp;

		// minとmaxの間隔を狭めながら進める

		if(data[min] < pivot){// ピボット値より小さい場合
			min++;// minを右に進める(これ以降移動はしない事に)
		}

		if(pivot <= data[max]){// ピボット値以上の場合
			max--;// maxを左に進める(これ以降移動はしない事に)
		}
	}
	return min;// ピボット位置
}