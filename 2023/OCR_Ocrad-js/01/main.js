console.log("main.js!!");

const SD_SIZE = 9;// Sudoku_9x9
const SD_MAX  = SD_SIZE * SD_SIZE;

let cvs       = null;// Canvas

$(document).ready(()=>{
	console.log("Ready!!");
	// Canvas
	cvs = document.createElement("canvas");
	// Uploader
	const elm = document.getElementById("uploader");
	elm.addEventListener("change", (e)=>{
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = (e)=>{loadImg(reader.result)}
	});
});

function loadImg(src){
	// Image
	const img = document.createElement("img");
	img.src = src;
	img.onload = (e)=>{
		// Canvas
		cvs.width  = img.width;
		cvs.height = img.height;
		const ctx  = cvs.getContext("2d");
		ctx.drawImage(img, 0, 0, img.width, img.height);
		// Append
		const elem = document.getElementById("my_target");
		elem.appendChild(cvs);
		// OCRAD
		OCRAD(img, {verbose: true, numeric: true}, (e)=>scanImg(img, e.letters));
	}
}

function scanImg(img, letters){
	const ctx = cvs.getContext("2d");// Context
	// Table(9x9)
	const table = new Array(SD_MAX).fill(0);
	const gSize = img.width / SD_SIZE;
	// Scan
	for(let letter of letters){
		const n = letter.matches[0].letter;
		if(n == "" | n == " " | n == "\t") continue;
		const x = letter.x;
		const y = letter.y;
		const w = letter.width;
		const h = letter.height;
		const cX = x + w/2;
		const cY = y + h/2;
		const r = Math.floor(cY / gSize);
		const c = Math.floor(cX / gSize);
		const i = r * SD_SIZE + c;
		table[i] = parseInt(n);
		ctx.fillStyle = "orange";
		ctx.fillRect(x, y, w, h);
	}
	solveSudoku(table, 0);// Solve
}

function drawResult(result){
	const gSize   = cvs.width / SD_SIZE;
	const fSize   = Math.floor(gSize*0.8);
	const ctx     = cvs.getContext("2d");// Context
	ctx.font      = fSize + "px Arial";
	ctx.textAlign = "center";
	console.log(result);
	for(let i=0; i<SD_MAX; i++){
		const r = Math.floor(i / SD_SIZE);
		const c = Math.floor(i % SD_SIZE);
		const x = c * gSize + gSize/2;
		const y = r * gSize + gSize/2 + fSize*0.4;
		ctx.fillStyle = "black";
		ctx.fillText(result[i], x, y);
	}
}

//==========
// 数独ソルバー

function solveSudoku(table, x){
	//console.log("solveSudoku");
	if(SD_MAX-1 < x){
		drawResult(Array.from(table));// Result
		return;
	}
	if(table[x] != 0){
		solveSudoku(table, x+1);
		return;
	}
	for(let n=1; n<=9; n++){
		if(!checkOK(table, n, x)) continue;
		table[x] = n;
		solveSudoku(table, x+1);
		table[x] = 0;
	}
}

function checkOK(table, n, x){
	if(!rowOK(table, n, x)) return false;
	if(!colOK(table, n, x)) return false;
	if(!frameOK(table, n, x)) return false;
	return true;
}

function rowOK(table, n, x){
	const row_top = Math.floor(x / SD_SIZE) * SD_SIZE;
	for(let i=0; i<SD_SIZE; i++){
		if(table[row_top+i] == n) return false;
	}
	return true;
}

function colOK(table, n, x){
	const col_top = Math.floor(x % SD_SIZE);
	for(let i=0; i<SD_SIZE; i++){
		if(table[col_top+i*SD_SIZE] == n) return false;
	}
	return true;
}

function frameOK(table, n, x){
	const frame_top = x - (Math.floor(x/SD_SIZE)*SD_SIZE) % 27 - Math.floor(x%3);
	for(let i=0; i<3; i++){
		for(let j=0; j<3; j++){
			if(table[frame_top+i*SD_SIZE+j] == n) return false;
		}
	}
	return true;
}