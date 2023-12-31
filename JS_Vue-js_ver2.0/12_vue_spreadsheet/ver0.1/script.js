// Vue.js

const URL_GOOGLE = "https://docs.google.com/spreadsheets/d/e/";
const URL_HASH = "2PACX-1vQTNtYa2s1mYs9S2pnrm9OzE0iUrzorKNp1hy_M35hYiyQaIL-XtOSqbkd2ccx_EpXoDOa21ckCE_nK/";
const URL_CSV = "pub?gid=0&single=true&output=csv";
const URL = URL_GOOGLE + URL_HASH + URL_CSV;
const OPTION = {responseType: "blob"};

function createApp(){
	console.log("Hello Vue.js!!");

	new Vue({
		el: "#wrapper",
		data: {
			message: "Hello Vue.js!!",
			items: [],
		},
		mounted:function(){
			// CSV
			axios.get(URL, OPTION).then(res=>{
				res.data.text().then(str=>{
					this.items = this.convertToArr(str);
					console.table(this.items);
				});
			});
		},
		methods:{
			init:function(){
				console.log("init!!");
			},
			connect:function(){
				console.log("connect!!");
			},
			convertToArr:function(str){
				let arr = [];
				let lines = str.split('\n');
				for(let line of lines) arr.push(line.split(","));
				return arr;
			}
		}
	});
}

// 初期化
function initialize(){
	createApp();
}

document.addEventListener("DOMContentLoaded", initialize.bind(this));
