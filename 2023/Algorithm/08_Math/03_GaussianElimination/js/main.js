console.log("Hello, JavaScript!!");

// ガウスの消去法で連立方程式を解く
//  2x + 3y +  1z = 4
//  4x + 1y + -3z = -2
// -1x + 2y +  2z = 2

const N = 3;

const matrix = [
	[ 2, 3,  1,  4],
	[ 4, 1, -3, -2],
	[-1, 2,  2,  2]
];

for(let r=0; r<N; r++){
	const p = matrix[r][r];// ピボット係数
	for(let c=0; c<N+1; c++){
		matrix[r][c] = matrix[r][c] / p;// ピボット係数で割る
	}
	// 掃き出し処理
	for(let i=0; i<N; i++){
		if(i == r) continue;
		const d = matrix[i][r];
		for(let j=r; j<N+1; j++){
			matrix[i][j] = matrix[i][j] - matrix[r][j] * d;
		}
	}
}

console.log("x:", matrix[0][N]);//  2
console.log("y:", matrix[1][N]);// -1
console.log("z:", matrix[2][N]);//  3