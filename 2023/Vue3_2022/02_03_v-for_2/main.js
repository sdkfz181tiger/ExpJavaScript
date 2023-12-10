console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgToday: "xx年xx月xx日",
	infosA: [
		"絵本読み聞かせ会(３階多目的ホール)",
		"町内会句会(２階小会議室A)",
		"日本野鳥の会定例会議(４階大会議室)"
	],
	infosB: [
		"ゲートボール推進会議(１階中会議室B)",
		"鉄道について語る会(２階中会議室)",
		"編み物と手芸教室(３階多目的室C)"
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		// TODO:本日の日付を取得しイベント情報を表示する
	}
});
app.mount("#app");// 3, Vue.jsを起動する