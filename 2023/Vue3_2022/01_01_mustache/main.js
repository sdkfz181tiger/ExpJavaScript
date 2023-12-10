console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgInfo: "***",
	msgMenu: "営業時間外です",
	weekLunches: [
		"リブステーキ",
		"ミラノ風ドリア",
		"イタリアンハンバーグ",
		"クリームグラタン",
		"ペペロンチーノ",
		"マルゲリータ",
		"若鳥のディアボラ風"
	]
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");

		let today = new Date();
		let hour = today.getHours();// 今の時刻(0 ~ 23)
		console.log("現在の時刻:" + hour);

		// 08:00 ~ 10:59
		if(8 <= hour && hour < 11){
			this.msgInfo = "モーニング";
			this.msgMenu = "コーヒー&トーストセット";
		}

		// 11:00 ~ 13:59
		if(11 <= hour && hour < 14){
			this.msgInfo = "ランチタイム";
			let day = today.getDay();// 曜日を取得(0 ~ 6)
			this.msgMenu = this.weekLunches[day];
		}

		// 14:00 ~ 17:59
		if(14 <= hour && hour < 18){
			this.msgInfo = "オススメ";
			this.msgMenu = "店長おすすめセット";
		}

		// 18:00 ~ 20:59
		if(18 <= hour && hour < 21){
			this.msgInfo = "ディナータイム";
			this.msgMenu = "ディナーセット";
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する