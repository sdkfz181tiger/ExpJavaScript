console.log("Hello, JavaScript!!");

// 最小二乗法によるフィッティング(計算する場合)

// データ
const points = [
	[-13, 5], [-8, -6], [-5, -9], [5, -4], [10, 4], [15, 8]
];

// Window
window.onload = (e)=>{

	// JSXGraph
	const jsx = JXG.JSXGraph.initBoard("jxgbox", 
		{axis: true, boundingbox: [-20, 15, 20, -15]});

	/*
	// 一次関数
	jsx.create("functiongraph", [x=>x], {strokeColor:"purple"});

	// 二次関数
	jsx.create("functiongraph", [x=>x**2], {strokeColor:"lime"});

	// 三次関数
	jsx.create("functiongraph", [x=>x**3], {strokeColor:"orange"});

	// Sin, Cos, Tan
	jsx.create("functiongraph", [x=>5*Math.sin(x/2)], {strokeColor:"red"});
	jsx.create("functiongraph", [x=>5*Math.cos(x/2)], {strokeColor:"green"});
	jsx.create("functiongraph", [x=>5*Math.tan(x/2)], {strokeColor:"blue"});
	*/
	
	{
		// ポイントだけ表示する
		for(const point of points){
			jsx.create("point", point, {size:2, color:"orange"});
		}

		// 最小二乗法
		// a, b, c, d, eの値を求める
		let a, b, c, d, e;
		a = b = c = d = e = 0;
		for(const point of points){
			const x = point[0];
			const y = point[1];
			a += y**2;
			b += x * y;
			c += y;
			d += x**2;
			e += x;
		}

		// 計算して直線の傾きmと切片iを求める
		const len = points.length;
		const m = (len * b - c * e)/(-(e**2) + len * d);
		const i = (c * d - b * e)/(-(e**2) + len * d);
		console.log("式: y = " + m + "x + " + i);

		// 一次関数を描画する
		const options = {strokeColor:"red"};
		jsx.create("functiongraph", [x=>m * x + i], options);
	}
}