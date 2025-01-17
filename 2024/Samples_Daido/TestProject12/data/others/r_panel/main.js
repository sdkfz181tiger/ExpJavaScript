console.log("ResultPanel");

// システム変数等にアクセスする
// TYRANO.kag.variable.f // ゲーム変数
// TYRANO.kag.variable.tf// 一時変数
// TYRANO.kag.variable.sf// システム変数

// Body
const rp_body  = $('body');

// Panel
const rp_panel = $('<div class="rp_panel"></div>');
rp_body.append(rp_panel);

// 5forces
const rp_5forces = $('<div class="rp_5forces"></div>');
rp_panel.append(rp_5forces);

// Open/Close
let rp_toggle_flg = false;
const rp_toggle = $('<button class="rp_toggle">↓</button>');
rp_toggle.on("click", ()=>{
	console.log("click!!");
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

// Open
function openPanel(){
	console.log("openPanel");
	rp_panel.addClass("rp_panel_open");
	rp_panel.removeClass("rp_panel_close");
	rp_toggle.text("↑");
	rp_toggle_flg = true;
	refleshPanel();// Reflesh
}

// Close
function closePanel(){
	console.log("closePanel");
	rp_panel.addClass("rp_panel_close");
	rp_panel.removeClass("rp_panel_open");
	rp_toggle.text("↓");
	rp_toggle_flg = false;
}

// Reflesh
function refleshPanel(){
	console.log("refleshPanel");
	rp_5forces.empty();// Empty
	const keys = TYRANO.kag.variable.sf.big5_keys;
	const nums = TYRANO.kag.variable.sf.big5_nums;
	for(let i=0; i<keys.length; i++){
		const key = keys[i];
		const num = nums[i];
		console.log(key + ":" + num);
		append1Force(key, num);
	}
}

// Append 1 force
function append1Force(key, num){
	console.log(key, num);

	const rp_1force = $('<div class="rp_1force"></div>');
	rp_5forces.append(rp_1force);

	const rp_1force_a = $('<div class="rp_1force_a"></div>');
	rp_1force.append(rp_1force_a);
	const rp_1force_b = $('<div class="rp_1force_b"></div>');
	rp_1force.append(rp_1force_b);

	// Title
	const rp_1force_title = $('<div class="rp_1force_title"></div>');
	rp_1force_title.text(key[0]);
	rp_1force_b.append(rp_1force_title);

	// Number
	const rp_1force_num = $('<div class="rp_1force_num"></div>');
	rp_1force_num.text(num);
	rp_1force_b.append(rp_1force_num);

	// Text
	const rp_1force_text = $('<div class="rp_1force_text"></div>');
	// 2025/01/17: 3段階に変更
	// 0  ~ 35
	// 36 ~ 65
	// 66 ~ 100
	// の範囲で変化します。(調整してみてね)
	console.log("num:", num);
	let force_text = "*";
	if(num <= 35){
		force_text = key[1];
	} else if (num <= 65){
		force_text = key[2];
	} else {
		force_text = key[3];
	}
	rp_1force_text.text(force_text);
	rp_1force_b.append(rp_1force_text);

	// Chart
	const rp_canvas = $('<canvas class="rp_canvas"></canvas>');
	rp_1force_a.append(rp_canvas);

	const ctx = rp_canvas[0].getContext("2d");
	const angle = Math.PI / 100 * num;
	ctx.lineWidth = 4;

	if(0 < num){
		ctx.strokeStyle = "lime";
		ctx.beginPath();
		ctx.ellipse(50, 55, 34, 34, Math.PI-angle, 0, angle);
		ctx.stroke();
	}

	if(num < 100){
		ctx.strokeStyle = "yellow";
		ctx.beginPath();
		ctx.ellipse(50, 55, 34, 34, 0, 0, Math.PI-angle);
		ctx.stroke();
	}
}

// Add force
function addForce(index, num){
	if(index < 0) return;
	if(TYRANO.kag.variable.sf.big5_nums.length <= index) return;
	TYRANO.kag.variable.sf.big5_nums[index] += num;
	refleshPanel();
}