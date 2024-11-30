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
		rp_li.append(key[0]);
		rp_ul.append(rp_li);

		// Detail
		const rp_detail_table = $('<table class="rp_detail_table"></table>');
		rp_li.append(rp_detail_table);
		const rp_tr = $('<tr></tr>');
		rp_detail_table.append(rp_tr);
		const rp_td_left = $('<td class="rp_td_side"></td>');
		rp_tr.append(rp_td_left);
		const rp_td_center = $('<td></td>');
		rp_tr.append(rp_td_center);
		const rp_td_right = $('<td class="rp_td_side"></td>');
		rp_tr.append(rp_td_right);

		rp_td_left.append(key[1] + "<br/>" + num + "%");	
		rp_td_right.append(key[2] + "<br/>" + (100-num) + "%");	

		// Bar
		const rp_bar_box = $('<div class="rp_bar_box"></div>');
		rp_td_center.append(rp_bar_box);
		const rp_bar_meter = $('<div class="rp_bar_meter"></div>');
		rp_bar_meter.css("width", num+"%");
		rp_bar_box.append(rp_bar_meter);
	}
}