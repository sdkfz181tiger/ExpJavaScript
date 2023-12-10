console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	dYear: 2022,
	dName: "",
	dNames:[
		"申", "酉", "戌", "亥", "子", "丑", "寅", "兎", "辰", "巳", "午", "未"
	],
	dImage: "",
	dImages: [
		"images/09.png",
		"images/10.png",
		"images/11.png",
		"images/12.png",
		"images/01.png",
		"images/02.png",
		"images/03.png",
		"images/04.png",
		"images/05.png",
		"images/06.png",
		"images/07.png",
		"images/08.png"
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.calc();
	},
	methods:{
		calc(){
			console.log("calc!!");

			const index = this.dYear % 12;

			this.dName = this.dNames[index];
			this.dImage = this.dImages[index];
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する