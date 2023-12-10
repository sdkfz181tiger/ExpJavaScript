console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgClinic: "大垣歯科医院",
	msgType: "歯科・口腔外科・小児歯科",
	msgTel: "TEL:0120-123-4567",
	msgFooter: "歯を大切にしましょう",
	dow: ["","日","月","火","水","木","金","土"],
	daysA: ["午前","●","-","●","●","●","●","●"],
	daysB: ["午後","●","-","-","-","●","●","●"]
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