console.log("ResultPanel");

// システム変数等にアクセスする
// TYRANO.kag.variable.f // ゲーム変数
// TYRANO.kag.variable.tf// 一時変数
// TYRANO.kag.variable.sf// システム変数

// Panel
const rp_body  = $('body');
const rp_panel = $('<div class="rp_panel"></div>');
rp_body.append(rp_panel);

// Open/Close
let rp_toggle_flg = false;
const rp_toggle = $('<button class="rp_toggle">OPEN</button>');
rp_toggle.on("click", ()=>{
	refleshPanel();// Reflesh
	if(!rp_toggle_flg){
		rp_panel.addClass("rp_panel_open");
		rp_panel.removeClass("rp_panel_close");
		rp_toggle.text("CLOSE");
	}else{
		rp_panel.addClass("rp_panel_close");
		rp_panel.removeClass("rp_panel_open");
		rp_toggle.text("OPEN");
	}
	rp_toggle_flg = !rp_toggle_flg;
});
rp_panel.append(rp_toggle);

// Big5
const rp_title = $('<h1 class="rp_title">=5つの性格傾向=</h1>');
rp_panel.append(rp_title);
const rp_ul = $('<ul class="rp_ul"></ul>');
rp_panel.append(rp_ul);
function refleshPanel(){
	rp_ul.empty();
	const keys = TYRANO.kag.variable.sf.big5_keys;
	const nums = TYRANO.kag.variable.sf.big5_nums;
	for(let i=0; i<keys.length; i++){
		const key = keys[i];
		const num = nums[i];
		const rp_li = $('<li class="rp_li"></li>');
		rp_li.append(key + ":" + num + "%");
		rp_ul.append(rp_li);
		// Bar
		const rp_bar_box = $('<div class="rp_bar_box"></div>');
		rp_li.append(rp_bar_box);
		const rp_bar_meter = $('<div class="rp_bar_meter"></div>');
		rp_bar_meter.css("width", num+"%");
		rp_bar_box.append(rp_bar_meter);	
	}
}