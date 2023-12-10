console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	imgPath: "./images/main_banner_01.png"
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		// TODO1:imagesフォルダにある画像からランダムで選択する

		// TODO2:一定時間で画像をランダムで切り替える
	}
});
app.mount("#app");// 3, Vue.jsを起動する