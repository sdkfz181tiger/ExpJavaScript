console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	numHours: 0
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// 今日の日付
		const dObj = new Date();
		this.numHours = dObj.getHours();
	}
});
app.mount("#app");// 3, Vue.jsを起動する