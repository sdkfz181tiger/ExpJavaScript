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
	togglePanel();
});
rp_panel.append(rp_toggle);

function togglePanel(){
	if(!rp_toggle_flg){
		openPanel();
	}else{
		closePanel();
	}
}

// Big5
const rp_title = $('<h1 class="rp_title">=5つの性格傾向=</h1>');
//rp_panel.append(rp_title);
const rp_ul = $('<ul class="rp_ul"></ul>');
rp_panel.append(rp_ul);

// Open
function openPanel(){
	console.log("openPanel");
	refleshPanel();// Reflesh
	rp_panel.addClass("rp_panel_open");
	rp_panel.removeClass("rp_panel_close");
	rp_toggle.text("CLOSE");
	rp_toggle_flg = true;
}

// Close
function closePanel(){
	console.log("closePanel");
	rp_panel.addClass("rp_panel_close");
	rp_panel.removeClass("rp_panel_open");
	rp_toggle.text("OPEN");
	rp_toggle_flg = false;
}

// Reflesh
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

		rp_td_left.append(key[1] + "<br/>50%");	
		rp_td_right.append(key[2] + "<br/>50%");	

		// Bar
		const rp_bar_box = $('<div class="rp_bar_box"></div>');
		rp_td_center.append(rp_bar_box);
		const rp_bar_meter = $('<div class="rp_bar_meter"></div>');
		rp_bar_meter.css("width", "50%");
		rp_bar_box.append(rp_bar_meter);

		//rp_li.append("<hr/>");

		// Animate
		animateMeter(rp_bar_meter, rp_td_left, rp_td_right, key[1], key[2], num);
	}
}

// Animate
function animateMeter(bar, left, right, keyL, keyR, to){
	console.log("animateMeter:", to);
	if(to < 0) to = 0;
	if(100 < to) to = 100;
	bar.delay(800).animate({"width": to+"%"}, 
		{"duration": 800, "easing": "swing", "step": (e)=>{
			console.log("Step:", e);
			const num = Math.floor(e);
			left.html(keyL + "<br/>" + num + "%");
			right.html(keyR + "<br/>" + (100-num) + "%");
		}});
}