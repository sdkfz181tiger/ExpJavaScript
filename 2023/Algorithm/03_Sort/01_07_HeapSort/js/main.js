console.log("Hello, JavaScript!!");

// ヒープソート

const data = [91, 86, 72, 45, 69, 24, 55, 1, 12];// ヒープ構築済の配列
for(let i=data.length-1; 0<i; i--){
	swap(0, i);// TopとLastを入れ替える
	heapSort(0, i-1);// Heapの再構築(Lastの位置を一つ減らす)
	//console.log("i[", i, "]:", data);
}
console.log("Result:", data);

function heapSort(top, last){

	const l = ((top+1)*2) - 1;// 左の子要素(実際の位置を計算)
	const r = l + 1;// 右の子要素

	if(r <= last){// 子要素が2つある(左右の子が存在)
		if(data[l] < data[r]){
			// 根と右の子と比較し、topが大きければ交換
			if(data[top] < data[r]){
				swap(top, r);
				heapSort(r, last);// 再構築
			}
		}else{
			// 根と左の子と比較し、topが大きければ交換
			if(data[top] < data[l]){
				swap(top, l);
				heapSort(l, last);// 再構築
			}
		}
	}else{// 子要素が1つある(左の子のみ存在)
		if(l <= last){
			// 根と左の子と比較し、topが大きければ交換
			if(data[top] < data[l]){
				swap(top, l);
				heapSort(l, last);// 再構築
			}
		}
	}
}

function swap(i, j){
	const tmp = data[i];
	data[i] = data[j];
	data[j] = tmp;
}