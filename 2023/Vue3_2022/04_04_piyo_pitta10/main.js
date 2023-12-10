console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	imgPiyo: "./images/piyo_smoke.png",
	msgPiyo: "10秒ピッタで止めてみや...",
	counter: 0,
	intervalID: -1
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
	},
	methods:{
		start(){
			console.log("start!!");
			this.msgPiyo = "スタートやで...";

			// 1000ミリ秒にリセット
			this.counter = 0;

			// 定期実行を開始(10ミリ秒間隔)
			this.intervalID = setInterval(()=>{
				this.counter += 10;// カウンタにプラスする
			}, 10);
		},
		stop(){
			console.log("stop!!");
			this.msgPiyo = "ストップやで...";

			// 定期実行を停止
			clearInterval(this.intervalID);

			// 判定処理
			const result = Math.floor(this.counter / 1000);
			if(result == 10){
				this.msgPiyo = "やるやんけ!!";
			}else{
				this.msgPiyo = "まだまだやな!!";
			}
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する