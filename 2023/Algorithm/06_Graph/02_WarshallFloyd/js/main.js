console.log("Hello, JavaScript!!");

// ワーシャルフロイド法による最短経路探索

// 出発地と目的地へのコスト表(999は未確定)
const table = [
	[  0,  18, 999,  14, 999],
	[ 18,   0,  17, 999,  16],
	[999,  17,   0,  13, 999],
	[ 14, 999,  13,   0,  12],
	[999,  16, 999,  12,   0]
];

const n = 5;

// 中継地:v
for(let v=0; v<n; v++){
	// 出発地:f, 目的地:t
	for(let f=0; f<n; f++){
		for(let t=f+1; t<n; t++){
			// f->tより、f->v->tの距離が小さい場合
			if(table[f][v] + table[v][t] < table[f][t]){
				// 最短距離を更新
				table[f][t] = table[v][t] + table[v][t];
				table[t][f] = table[v][t] + table[v][t];
			}
		}
	}
}

showTable();

function showTable(){

	let str = "";
	for(let r=0; r<n; r++){
		for(let c=0; c<n; c++){
			let num = table[r][c];
			console.log(num);
			if(num < 10){
				num = "  " + num.toString();
			}else if(num < 100){
				num = " " + num.toString();
			}
			num += (c < n-1) ? ", ":"\n";
			str += num;
		}
	}
	console.log(str);
}