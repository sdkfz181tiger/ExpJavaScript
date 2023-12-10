console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	images: [
		"./images/main_corona.png",
		"./images/main_festa.png",
		"./images/main_golden.png",
		"./images/main_grandopen.png",
		"./images/main_mask.png",
		"./images/main_strawberry.png",
		"./images/main_summer.png",
		"./images/main_tanabata.png"
	],
	imgPath: ""
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.show();// show関数を実行する
	},
	methods:{
		show(){// show関数
			console.log("show!!");

			// TODO: images配列にある画像をランダムで一つ表示する事
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する