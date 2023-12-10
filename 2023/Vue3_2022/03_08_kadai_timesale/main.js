console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgInfo: "5月12日0時開催!!",
	msgHours: 0,
	msgMinutes: 0
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

			// 現在日時
			const dNow  = new Date();
			// タイムセール開始日時(年, 月, 日, 時, 分)
			const dSale = new Date(2022, 4, 13, 9, 0);

			// タイムセール日時と現在日時の差(ミリ秒)を計算する
			const passed = dSale.getTime() - dNow.getTime();
			const hour = Math.floor(passed / 1000 / 60 / 60);// 時
			const min  = Math.floor(passed / 1000 / 60) % 60;// 分
			console.log(hour, min);

			this.msgHours = hour;
			this.msgMinutes = min;

			// 3000ミリ秒後に再計算
			setTimeout(()=>{
				this.calcTime();
			}, 3000);
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する