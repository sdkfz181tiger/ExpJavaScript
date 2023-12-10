console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgMain: "*",
	msgPoint: "*****",
	msgBonus: 0
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// 現在日時
		const dNow = new Date();

		// TODO1:
		//     "月水金"曜日は"POINT"を"3"倍に、
		//     "火木土"曜日は"POINT"を"10"倍に、
		//     "日"曜日は"BONUS"を"30"倍と表示する事
	}
});
app.mount("#app");// 3, Vue.jsを起動する