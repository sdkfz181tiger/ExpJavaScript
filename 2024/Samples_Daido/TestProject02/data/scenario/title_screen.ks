
;==============================
; タイトル画面
;==============================

[hidemenubutton]

[tb_clear_images]

[tb_keyconfig flag=0]


	;標準のメッセージレイヤを非表示
	[tb_hide_message_window]

	;タイトル表示
	[bg storage ="title.jpg"]

	*title

	

	;タイトル各種ボタン
	[glink color="black" text="はじめから" x=400 y=270 size=20 target="*start"]
	[glink color="black" text="つづきから" x=400 y=370 size=20 target="*load"]


	

	[s]

	;-------ボタンが押されたときの処理

	*start

	
	[showmenubutton]
	

	[cm]
	[tb_keyconfig flag=1]

	@jump storage="scene1.ks"
	[s]

	;--------ロードが押された時の処理
	*load

	[cm]
	[showload]
	[jump target=*title]

	[s]


