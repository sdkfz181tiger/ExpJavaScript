console.log("main.js!!");

// 1, Vue.jsで扱うデータを用意する
const myData = {
	appName: "Digital Signage",// アプリ名
	msgGoal: 10000,
	msgMonth: 1,
	msgDate: 2,
	msgHours: 3,
	msgMinutes: 4,
	fNameA: "大垣工場",
	fHoursA: 0,
	fNameB: "岐阜工場",
	fHoursB: 0
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

			// TODO1: 今日の日付を表示する事
			const dNow = new Date();// 今日の日時
			console.log("今日の日時:", dNow);

			// TODO2: 大垣工場の無災害経過時間(計測開始日から何時間経過したか)を表示する事
			//        (計測開始日は"2022/05/01 0:0:0"とする)

			// TODO3: 岐阜工場の無災害経過時間(計測開始日から何時間経過したか)を表示する事
			//        (計測開始日は"2022/06/01 0:0:0"とする)

			// 3000ミリ秒後に再計算
			setTimeout(()=>{
				this.calcTime();
			}, 3000);
		}
	}
});
app.mount("#app");// 3, Vue.jsを起動する