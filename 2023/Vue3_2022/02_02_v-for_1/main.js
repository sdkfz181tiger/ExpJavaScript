console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgMain: "日替わりランチ",
	msgTime: "11:30 ~ 13:30",
	msgMenu: [
		"ハンバーグランチ : 980円",
		"パスタランチ : 780円",
		"ビーフシチューランチ : 680円"
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
	}
});
app.mount("#app");// 3, Vue.jsを起動する