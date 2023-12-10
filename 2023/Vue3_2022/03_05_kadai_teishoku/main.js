console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	mainMenu: "ハンバーグ定食",
	mainImg: "./images/food_hum.png",
	mainPrice: "880",
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// TODO1:
		//     曜日によって日替わり定食を切り替える事
		//         (価格は全て880円とする事)
		//         月: ハンバーグ定食
		//         火: カレー定食
		//         水: 唐揚げ定食
		//         木: ハンバーグ定食
		//         金: カレー定食
		//         土: 唐揚げ定食
		//         日: ハンバーグ定食

		// TODO2:
		//     定食Aを次のランダムで切り替える事
		//         (価格もそれに合わせる事)
		//         卵焼き定食: 650円
		//         肉じゃが定食: 780円
		//         焼き鮭定食: 880円

		// TODO3:
		//     定食Bを次のランダムで切り替える事
		//         (価格もそれに合わせる事)
		//         エビフライ定食: 980円
		//         海鮮丼定食: 1100円
		//         ステーキ定食: 1230円
	}
});
app.mount("#app");// 3, Vue.jsを起動する