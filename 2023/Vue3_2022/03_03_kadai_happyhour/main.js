console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgMain: "ALL DRINK",
	msgDiscount: 50,
	msgInfo: "***"
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.calcTime();// 日時計算を実行する
	},
	methods:{
		calcTime(){

			// TODO1: 時間帯によって表示内容を変更する事
			//     16:00 ~ 18:59: "アルコール類割引中です!!"
			//     上記以外: "ハッピーアワーは終了しました"

			// 現在時刻
			const dNow = new Date();

			// 3000ミリ秒後に再計算
			setTimeout(()=>{
				this.calcTime();
			}, 3000);
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する