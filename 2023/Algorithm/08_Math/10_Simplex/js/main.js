console.log("Hello, JavaScript!!");

// シンプレックス法による線形計画

// 線形計画問題(制約条件が2つの場合)
//     お菓子Aの最大生産数が360
//     お菓子Bの最大生産数が240
//     商品PはAx6、Bx2の構成で600円の利益
//     商品QはAx3、Bx4の構成で400円の利益

// シンプレックス表([0][2]と[1][3]はスラック変数)
const table = [
	[   6,    3, 1, 0, 360],// 制約条件式A
	[   2,    4, 0, 1, 240],// 制約条件式B
	[-600, -400, 0, 0,   0] // 目的関数
];

// 線形計画問題(制約条件が3つの場合)
//     お菓子Aの最大生産数が360
//     お菓子Bの最大生産数が240
//     お菓子Cの最大生産数が120
//     商品PはAx6、Bx2、Cx4の構成で1000円の利益
//     商品QはAx3、Bx4、Cx2の構成で600円の利益

// シンプレックス表([0][2]と[1][3]と[2][4]はスラック変数)
// const table = [
// 	[   6,    3, 1, 0, 0, 360],// 制約条件式A
// 	[   2,    4, 0, 1, 0, 240],// 制約条件式B
// 	[   4,    2, 0, 0, 1, 120],// 制約条件式C
// 	[-1000,-600, 0, 0, 0,   0] // 目的関数
// ];

const rows = table.length;
const cols = table[0].length;

// Window
window.onload = (e)=>{

	// JSXGraph
	const jsx = JXG.JSXGraph.initBoard("jxgbox", 
		{axis: true, boundingbox: [-50, 150, 200, -50]});
	drawLine();// 制約条件式を表に表示

	// 目的関数を表示する
	const y = -table[rows-1][1];
	const n = -table[rows-1][0] / -y;
	calcSimplex();// シンプレックス法
	const i = table[rows-1][cols-1] / y;
	const result = table[rows-1][cols-1];
	console.log("最大利益:", result);
	jsx.create("functiongraph", [x=>n*x+i], {strokeColor:"red"});

	// シンプレックス法
	function calcSimplex(){

		showTable();// テーブルの状態

		// 目的関数の係数の最小値からその列を確定
		let minC = table[rows-1][0];
		let c = 0;
		for(let i=1; i<cols; i++){
			const num = table[rows-1][i];
			if(num < minC){
				minC = num;// 最小値
				c = i;// 選択した列
			}
		}
		console.log("選択した列:", c);// 選択した列

		if(0 <= minC) return;// 計算終了判定

		// 制約条件式の"右辺 / 選択した列の係数"が
		// 最小の行を選択する
		let minR = table[0][cols-1] / table[0][c];
		let r = 0;
		for(let i=1; i<rows-1; i++){
			const num = table[i][cols-1]/table[i][c];
			if(num < minR){
				minR = num;// 最小値
				r = i;// 選択した行
			}
		}
		console.log("選択した行:", r);// 選択した行

		// ピボット(選択した列と行の交点)の係数を1にする
		const pivot = table[r][c];
		for(let i=0; i<cols; i++) table[r][i] /= pivot;

		// 選択された以外の行で
		// ピボットと同じ列の係数を0にする(ガウス)
		for(let i=0; i<rows; i++){
			if(i == r) continue;
			const mul = table[i][c];
			for(let j=0; j<cols; j++){
				table[i][j] -= table[r][j] * mul;
			}
		}

		calcSimplex();// 再起処理
	}
	
	function showTable(){
		let line = "= Table =\n";
		for(let i=0; i<table.length; i++){
			for(let j=0; j<table[i].length; j++){
				line += table[i][j];
				if(j < table[i].length-1) line += ", ";
			}
			line += "\n";
		}
		console.log(line);
	}

	// 制約条件式を表示する
	function drawLine(){
		const color = {strokeColor:"gray"};
		for(let r=0; r<rows-1; r++){
			const y = table[r][1];
			const n = table[r][0] / -y;
			const i = table[r][cols-1] / y;
			jsx.create("functiongraph", [x=>n*x+i], color);
		}
	}
}