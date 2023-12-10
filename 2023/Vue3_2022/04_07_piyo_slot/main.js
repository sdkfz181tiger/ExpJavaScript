console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	intervalID: -1,
	numA: 0,
	numB: 0,
	numC: 0,
	resultStr: "***",
	icons: [
		"./images/piyo_01.png",
		"./images/piyo_02.png",
		"./images/piyo_03.png",
		"./images/piyo_04.png",
		"./images/piyo_05.png",
		"./images/piyo_06.png",
		"./images/piyo_07.png",
		"./images/piyo_08.png",
		"./images/piyo_09.png",
		"./images/piyo_10.png",
		"./images/piyo_11.png",
		"./images/piyo_12.png"
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.roulette();
	},
	methods:{
		start(){
			if(0 < this.intervalID) return;
			console.log("start!!");

			// Interval
			this.intervalID = setInterval(()=>{
				this.roulette();
			}, 100);

			this.resultStr = "***";
		},
		stop(){
			if(this.intervalID < 0) return;
			console.log("stop!!");

			// Clear
			clearInterval(this.intervalID);
			this.intervalID = -1;

			console.log(this.numA, this.numB, this.numC);
			if(this.numA == this.numB && this.numA == this.numC){
				this.resultStr = "あたり!!";
			}else{
				this.resultStr = "はずれ!!";
			}
		},
		roulette(){
			this.numA = Math.floor(Math.random() * 12);
			this.numB = Math.floor(Math.random() * 12);
			this.numC = Math.floor(Math.random() * 12);
			this.iconA = this.icons[this.numA];
			this.iconB = this.icons[this.numB];
			this.iconC = this.icons[this.numC];
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する