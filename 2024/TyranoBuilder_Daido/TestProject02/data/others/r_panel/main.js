console.log("ResultPanel");

// Panel
const rp_body  = $('body');
const rp_panel = $('<div class="rp_panel"></div>');
rp_body.append(rp_panel);

// Open/Close
let rp_toggle_flg = false;
const rp_toggle = $('<button class="rp_toggle">OPEN</button>');
rp_toggle.on("click", ()=>{
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