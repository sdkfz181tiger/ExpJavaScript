console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	imgKey: "./images/main_key_mask.png",
	msg1: "新型コロナウィルス\n拡大防止対策のため",
	msg2: "ご協力を\nお願いします",
	msg3: "マスクの着用",
	msg4: "新型コロナウィルス予防対策のため、\nマスク着用をお願いいたします。",
}

// 2, Vue.jsの準備をする
const app = Vue.createApp({
	data(){
		return myData;// 扱うデータを指定する
	},
	created(){
		console.log("created!!");
		this.calcTime();// 日時計算を実行する
	},
	methods:{
		calcTime(){

			// TODO1:
			//     "カンプ_01.png"
			//     を参考に、サイネージを完成させる事

			// TODO2:
			//     "カンプ_01.png" -> "カンプ_02.png" -> "カンプ_03.png"
			//     を参考に、10秒間隔でこれらの表示を切り替える事

			// HINT:3000ミリ秒後に再計算
			setTimeout(()=>{
				this.calcTime();
			}, 3000);
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する