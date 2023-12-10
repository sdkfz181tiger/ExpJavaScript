console.log("Hello, JavaScript!!");

// ダイクストラ法でグラフを探索する(優先度有り)

// 移動コストを格納したグラフ
// 0は自ノード、-1は未探索、それ意外はコスト
const graph = [
	[ 0, 1, 9, 9,-1,-1,-1],
	[ 1, 0,-1,-1, 1,-1, 9],
	[ 9,-1, 0, 1, 1,-1, 9],
	[ 9,-1, 1, 0,-1, 1,-1],
	[-1, 1, 1,-1, 0,-1, 9],
	[-1,-1,-1, 1,-1, 0, 1],
	[-1, 9, 9,-1, 9, 1, 0]
];

// ノードの総数
const total = graph.length;
const sNode = 0;// 開始ノード
const eNode = 6;// 目的地ノード

// 探索コスト
const costs = new Array(total).fill(999);
costs[0] = 0;

// 探索経路(探索結果)
const routes = new Array(total).fill(-1);
routes[0] = sNode;

// 探索リストが空になるまで先頭から取り出す
const queue = [sNode];
while(0 < queue.length){
	const node = queue.shift();// 先頭から1つ取り出す
	const arr = graph[node];
	console.log("== node:" + node + " ==");
	for(let i=0; i<arr.length; i++){
		if(arr[i] <= 0) continue;
		//console.log("-> i:", i, "cost:", arr[i]);
		const cost = costs[node] + arr[i];
		if(cost < costs[i]){
			costs[i] = cost;// コストを更新
			routes[i] = node;// 探索経路を更新
			queue.push(i);// 探索リストに追加
			sortQueue(queue);// 探索リストをコスト昇順にソート
		}
	}
}

// 結果を表示
let index = eNode;
let result = String(index);
while(index != sNode){
	index = routes[index];
	result = index + " > " + result;
}
console.log("移動コスト:" + costs[eNode]);
console.log("探索経路:" + result);

// 探索リストをコスト昇順にソート
function sortQueue(){
	for(let i=0; i<queue.length-1; i++){
		for(let j=i+1; j<queue.length; j++){
			let a = queue[i];
			let b = queue[j];
			if(costs[a] > costs[b]){// コスト昇順
				const tmp = queue[i];
				queue[i] = queue[j];
				queue[j] = tmp; 
			}
		}
	}
}
