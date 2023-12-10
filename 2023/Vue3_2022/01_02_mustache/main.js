console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgTime: "11:30 ~ 13:30",
	msgRibbonA: "モーニング",
	msgMenuA: "***",
	msgRibbonB: "ランチ",
	msgMenuB: "***"
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// Hint: 日付を取得する(検索して調べる事)
		const dObj  = new Date();
		const year  = dObj.getFullYear();// 年
		const month = dObj.getMonth();// 月
		const date  = dObj.getDate();// 日
		console.log("今日:", year, month, date);

		// TODO1: "曜日"によってモーニングセットを表示する事
		//   月: ジャーマンドッグセット
		//   火: レタスドッグセット
		//   水: 定休日です
		//   木: ベーコン&エッグセット
		//   金: アボガドチキンセット
		//   土: ハム卵サラダセット
		//   日: チーズトーストセット

		// TODO2: "曜日"によってランチセットを表示する事
		//   月: ツナチェダーチーズセット
		//   火: ボローニャソーセージセット
		//   水: 定休日です
		//   木: チーズインミラノサンドセット
		//   金: 半熟卵とアボガドサーモンセット
		//   土: クロックムッシュセット
		//   日: 生ハムボンレスハムセット
	}
});
app.mount("#app");// 3, Vue.jsを起動する