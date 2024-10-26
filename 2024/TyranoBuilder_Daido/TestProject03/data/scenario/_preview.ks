[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[cm  ]
[iscript]
// 分析の最終結果を格納する配列
// この配列の値に加算、減算するよ!!
let key1 = ["外交性","外交","内向"];
let key2 = ["協調性","協調","排他"];
let key3 = ["勤勉性", "勤勉","怠惰"];
let key4 = ["情動性","論理","情動"];
let key5 = ["創造性","創造","保守"];
sf.big5_keys = [key1,key2,key3,key4,key5];
sf.big5_nums = [10, 20, 90, 40, 50];
[endscript]

[tb_start_tyrano_code]
;結果パネル
[loadcss file="./data/others/r_panel/main.css"]
[loadjs storage="./r_panel/main.js"]
[_tb_end_tyrano_code]

[bg  storage="room.jpg"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
分析結果を確認するパネルを作りました。[p]
どうかしら?[p]
[_tb_end_text]

[s  ]
