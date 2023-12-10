console.log("Hello, JavaScript!!");

// ベルマンフォード法による最短経路探索

const START = 0;// スタート位置
const GOAL  = 6;// ゴール位置

const edges = [];

// 移動コスト表
const costs = [
	[0, 9, 2, 0, 0, 0, 0],
	[9, 0, 6, 3, 1, 0, 0],
	[2, 6, 0, 2, 0, 9, 0],
	[0, 3, 2, 0, 5, 6, 0],
	[0, 1, 0, 5, 0, 3, 7],
	[0, 0, 9, 6, 3, 0, 4],
	[0, 0, 0, 0, 7, 4, 0]
];

window.onload = ()=>{

	// Edges
	for(let i=START; i<=GOAL; i++){
		edges.push(new Edge(i));// 位置を初期化
	}

	// Search
	edges[START].cost = 0;// スタート位置
	search(START);// 検索を開始

	// Result
	let pathes = [];
	let edge = edges[GOAL];
	pathes.push(edge);
	do{
		edge = edges[edge.from];
		pathes.push(edge);
	}while(0 <= edge.from);
	pathes = pathes.reverse();

	let result = "Result:";
	for(let path of pathes){
		result += path.index + "(" + path.cost + ")";
		if(path.index != GOAL) result += " -> ";
	}
	console.log(result);
}

function search(i){
	if(i == GOAL) return;// ゴールであれば終了

	for(let n=START; n<=GOAL; n++){
		const next = costs[i][n];// iからnまでの移動コスト
		if(next == 0) continue;// 0ならば検索をしない
		const cost = edges[i].cost + next;// 現在のコストに移動コストの合計
		if(edges[n].cost < cost) continue;// 移動先のコストと比較
		edges[n].cost = cost;// 移動先のコストを更新
		edges[n].from = i;// 移動先に移動元のインデックスを記録
		search(n);// 検索を継続
	}
}

class Edge{

	constructor(i){
		this._index = i;
		this._cost = Infinity;
		this._from = -1;
	}

	get index(){return this._index;}

	get cost(){return this._cost;}

	set cost(c){this._cost = c;}

	get from(){return this._from;}

	set from(f){this._from = f;}
}