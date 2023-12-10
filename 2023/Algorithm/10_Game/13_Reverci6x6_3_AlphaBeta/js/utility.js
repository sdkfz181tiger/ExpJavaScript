"use strict";

//==========
// Utility

const WIDTH   = 320;
const HEIGHT  = 320;
const ROWS    = 6;
const COLS    = ROWS;

const T_NONE  = 0;
const T_WHITE = 1;
const T_BLACK = 2;
const T_SIZE  = 30;
const T_DIRS  = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const T_DEPTH = 6;
const T_WAIT  = 2000;

const T_BONUS_TBL = [
	[ 99,-22,  0,  0,-22, 99],
	[-22,-33,  0,  0,-33,-22],
	[  0,  0,  0,  0,  0,  0],
	[  0,  0,  0,  0,  0,  0],
	[-22,-33,  0,  0,-33,-22],
	[ 99,-22,  0,  0,-22, 99]
]

class ReversiManager{

	constructor(sX, sY){

		// Board
		this._board = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(0));
		this._board[ROWS/2-1][COLS/2-1] = T_WHITE;// 1, 1
		this._board[ROWS/2][COLS/2]     = T_WHITE;// 2, 2
		this._board[ROWS/2][COLS/2-1]   = T_BLACK;// 2, 1
		this._board[ROWS/2-1][COLS/2]   = T_BLACK;// 1, 2
		
		// Turn
		this._turn = T_WHITE;// First
		this._you  = (Math.random() < 0.5) ? T_WHITE:T_BLACK;
		this._com  = this.nextTurn(this._you);

		// Message
		this._msgTurn = "";
		this._msgResult = "";

		// Checker
		this._bdManager = new BoardManager(sX, sY);
		this._availables = this._bdManager.getAvailables(this._board, this._turn);
		//this._bdManager.trace(this._board);// Trace

		// Pass
		this.checkPass(this._board, this._turn);
	}

	checkPass(board, turn){
		console.log("checkPass:", turn);

		// Available
		if(this._bdManager.isAvailable(board, turn)){
			if(turn != this._com) return;
			setTimeout(()=>{// Timeout
				this.thinkCom(board, this._turn, this._availables);
			}, T_WAIT);
		}else{
			if(this._bdManager.isFinished(board)){
				console.log("Finished!!");
				const result = this._bdManager.judgeBoard(board);
				this._msgResult = "Result:";
				if(result == T_NONE){
					this._msgResult += "Even...";
				}else if(result == this._you){
					this._msgResult += "You win!!";
				}else if(result == this._com){
					this._msgResult += "You lose...";
				}else{
					this._msgResult += "Error...";
				}
				console.log(this._msgResult);
				return;
			}
			// Pass
			console.log("Pass:", turn);
			const nextTurn = this.nextTurn(turn);
			const nextAvailables = this._bdManager.getAvailables(board, nextTurn);
			this._turn = nextTurn;
			this._availables = nextAvailables;
			if(this._turn != this._com) return;
			setTimeout(()=>{// Timeout
				this.thinkCom(board, this._turn, this._availables);
			}, T_WAIT);
		}
	}

	thinkPlayer(x, y){
		if(this._turn != this._you) return;
		const pos = this._bdManager.getRC(this._availables, x, y);
		if(!pos) return;
		console.log("thinkPlayer");
		const nextBoard = this._bdManager.putDisk(this._board, this._turn, pos.r, pos.c);
		const nextTurn = this.nextTurn(this._turn);
		const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
		// Change
		this._board = nextBoard;
		this._turn = nextTurn;
		this._availables = nextAvailables;
		//this._bdManager.trace(this._board);
		// Pass
		this.checkPass(this._board, this._turn);
	}

	thinkCom(board, turn, availables){
		if(turn != this._com) return;
		console.log("thinkCom");
		let bestScore = Infinity * -1;
		let choise = {r: -1, c: -1};
		for(let available of availables){
			const r = available[0];
			const c = available[1];
			const nextBoard = this._bdManager.putDisk(board, turn, r, c);
			const nextTurn = this.nextTurn(turn);
			const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
			// MinMax
			const score = this.alphabeta(nextBoard, nextTurn, nextAvailables, 1, -Infinity, Infinity);
			console.log("com:", r, c, score);
			if(bestScore < score){
				bestScore = score;
				choise.r = r;
				choise.c = c;
			}
		}
		console.log("Choise:", choise.r, choise.c, "Score:", bestScore);

		const nextBoard = this._bdManager.putDisk(board, this._turn, choise.r, choise.c);
		const nextTurn = this.nextTurn(this._turn);
		const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
		// Change
		this._board = nextBoard;
		this._turn = nextTurn;
		this._availables = nextAvailables;
		//this._bdManager.trace(this._board);
		// Pass
		this.checkPass(this._board, this._turn);
	}

	alphabeta(board, turn, availables, depth, alpha, beta){
		if(T_DEPTH < depth) return 0;// Strength
		//console.log("alphabeta[" + turn + "]", "Depth:", depth);

		// Not available
		if(!this._bdManager.isAvailable(board, turn)){
			// Finished or Pass
			if(!this._bdManager.isAvailable(board, this.nextTurn(turn))){
				// Finished
				const result = this._bdManager.judgeBoard(board);
				const score = 999 - depth;// Score
				if(result == 0) return 0;
				if(result == this._you) return -score;
				if(result == this._com) return score;
			}else{
				// Pass
				const nextTurn = this.nextTurn(turn);
				const nextAvailables = this._bdManager.getAvailables(board, nextTurn);
				return this.alphabeta(board, nextTurn, nextAvailables, depth, alpha, beta);
			}
		}

		// Com or You
		if(turn == this._com){
			for(let available of availables){
				const r = available[0];
				const c = available[1];
				const nextBoard = this._bdManager.putDisk(board, turn, r, c);
				const nextTurn = this.nextTurn(turn);
				const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
				// MinMax
				let score = this.alphabeta(nextBoard, nextTurn, nextAvailables, depth+1, alpha, beta);
				score += this._bdManager.evaluateBoard(nextBoard, depth, r, c, 1);
				alpha = Math.max(alpha, score);// Max
				if(beta <= alpha) break;// Alpha cut!!
			}
			return alpha;
		}else{
			for(let available of availables){
				const r = available[0];
				const c = available[1];
				const nextBoard = this._bdManager.putDisk(board, turn, r, c);
				const nextTurn = this.nextTurn(turn);
				const nextAvailables = this._bdManager.getAvailables(nextBoard, nextTurn);
				// MinMax
				let score = this.alphabeta(nextBoard, nextTurn, nextAvailables, depth+1, alpha, beta);
				score += this._bdManager.evaluateBoard(nextBoard, depth, r, c, -1);
				beta = Math.min(beta, score);// Min
				if(beta <= alpha) break;// Beta cut!!
			}
			return beta;
		}
	}

	nextTurn(turn){
		return (turn == T_WHITE) ? T_BLACK:T_WHITE;
	}

	update(){
		this._bdManager.drawBoard(this._board);// Board
		this._bdManager.drawAvailables(this._availables, (this._turn==this._you));// Availables
		this.drawMsg();// Message
	}

	drawMsg(){
		// Title
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "22px Arial";
		ctx.fillText("Reversi6x6_D" + T_DEPTH, WIDTH/2, 28);
		// Turn
		this._msgTurn = (this._turn == this._you) ? "Turn:you":"Turn:com";
		ctx.textAlign = "left";
		ctx.font = "16px Arial";
		ctx.fillText(this._msgTurn, 24, HEIGHT - 20);
		// Result
		const msgResult = "Result:***";
		ctx.textAlign = "right";
		ctx.font = "16px Arial";
		ctx.fillText(this._msgResult, WIDTH-24, HEIGHT - 20);
	}
}

class BoardManager{

	constructor(sX, sY){
		this._sX = sX;
		this._sY = sY;
	}

	judgeBoard(board){

		let cntWhite = 0;
		let cntBlack = 0;
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				if(board[r][c] == T_WHITE) cntWhite++;
				if(board[r][c] == T_BLACK) cntBlack++;
			}
		}
		if(cntBlack < cntWhite) return T_WHITE;// White win
		if(cntWhite < cntBlack) return T_BLACK;// Black win
		return 0;// Even
	}

	isFinished(board){
		if(this.isAvailable(board, T_WHITE)) return false;// not finished
		if(this.isAvailable(board, T_BLACK)) return false;// not finished
		return true;
	}

	isAvailable(board, turn){
		return 0 < this.getAvailables(board, turn).length;
	}

	getAvailables(board, turn){
		const availables = [];
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				if(board[r][c] != T_NONE) continue;
				let flg = false;
				for(let dir of T_DIRS){
					const cnt = this.checkDisk(board, turn, r, c, dir, 0);
					if(cnt <= 0) continue;
					flg = true;
				}
				if(flg) availables.push([r, c]);// Push
			}
		}
		return availables;
	}

	putDisk(board, turn, r, c){
		if(r < 0 || c < 0) return board;
		if(ROWS-1 < r || COLS-1 < c) return board;

		// Copy
		const nextBoard = JSON.parse(JSON.stringify(board));
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				nextBoard[r][c] = board[r][c];
			}
		}
		// Put
		nextBoard[r][c] = turn;
		for(let dir of T_DIRS){
			const cnt = this.checkDisk(nextBoard, turn, r, c, dir, 0);
			if(cnt <= 0) continue;
			for(let i=0; i<cnt; i++){
				const oR = r + dir[0] * (i+1);
				const oC = c + dir[1] * (i+1);
				nextBoard[oR][oC] = turn;// Turn
			}
		}
		return nextBoard;
	}

	checkDisk(board, turn, r, c, dir, cnt){
		const oR = r + dir[0];
		const oC = c + dir[1];
		if(oR < 0 || ROWS-1<oR) return 0;
		if(oC < 0 || COLS-1<oC) return 0;
		const type = board[oR][oC];
		if(type == T_NONE) return 0;
		if(type != turn){
			return this.checkDisk(board, turn, oR, oC, dir, cnt+1);
		}
		if(type == turn && 0 < cnt) return cnt;
		return 0;
	}

	evaluateBoard(board, depth, r, c, flg){
		let score = T_BONUS_TBL[r][c] * flg * 3;
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				if(board[r][c] == T_NONE) continue;
				score += T_BONUS_TBL[r][c] * flg;
			}
		}
		return score;
	}

	trace(board){
		// Trace
		let str = "== Board ==\n";
		for(let r=0; r<ROWS; r++){
			str += "| ";
			for(let c=0; c<COLS; c++) str += board[r][c] + " ";
			str += "|\n";
		}
		str += "===========";
		console.log(str);
	}

	getRC(availables, x, y){
		if(x < this._sX) return null;
		if(y < this._sY) return null;
		if(this._sX + COLS*T_SIZE < x) return null;
		if(this._sY + ROWS*T_SIZE < y) return null;
		const r = Math.floor((y-this._sY)/T_SIZE);
		const c = Math.floor((x-this._sX)/T_SIZE);
		for(let available of availables){
			if(available[0] != r) continue;
			if(available[1] != c) continue;
			return {r: r, c: c};
		}
		return null;
	}

	drawBoard(board){
		// Board
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				const x = this._sX + T_SIZE * c;
				const y = this._sY + T_SIZE * r;
				ctx.fillStyle = "#008800"; 
				ctx.fillRect(x, y, T_SIZE-2, T_SIZE-2);
				if(board[r][c] == T_NONE) continue;
				ctx.fillStyle = (board[r][c] == T_WHITE) ? "#ffffff":"#000000";
				ctx.beginPath();
				ctx.arc(x+T_SIZE/2, y+T_SIZE/2, T_SIZE/4, 0, Math.PI*2, false);
				ctx.fill();
				ctx.closePath();
			}
		}
	}

	drawAvailables(availables, flg){
		// Availables
		for(let available of availables){
			const x = this._sX + T_SIZE * available[1];
			const y = this._sY + T_SIZE * available[0];
			ctx.fillStyle = (flg) ? "#dddd00":"#99cc99";
			ctx.fillRect(x, y, T_SIZE-2, T_SIZE-2);
		}
	}
}