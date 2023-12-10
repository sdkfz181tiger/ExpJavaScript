console.log("main.js!!");

// Notificationの設定を確認(Mac)
//		System Preferences -> Notifications
//		利用するブラウザのNotificationを"Allow notifications"

$(document).ready(()=>{
	console.log("Ready!!");

	// Push
	$("#my_btn").click(()=>{
		console.log("Push");

		// Check
		if(!Push.Permission.has()){
			// Request
			Push.Permission.request(()=>{
				console.log("onGranted!!");
				const status = Push.Permission.get();// Status
				$("#my_status").text(status);
			}, ()=>{
				console.log("onDenied!!");
				const status = Push.Permission.get();// Status
				$("#my_status").text(status);
			});
		}else{
			// Push
			Push.create("こんにちは!!", {
				body: "ゆっくり霊夢です!!",
				icon: "./images/reimu.png",
				tag: "myTag",
				timeout: 12000,
				vibrate: [100, 100, 100],
				onClick: function(e){
					console.log("onClick", e);
				},
				onShow: function(e){
					console.log("onShow", e);
				},
				onClose: function(e){
					console.log("onClose", e);
				},
				onError: function(e){
					console.log("onError", e);
				}
			});
		}
	});
});