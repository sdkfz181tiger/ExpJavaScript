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
// 各項目の初期値です
sf.big5_nums = [50, 50, 50, 50, 50];
[endscript]

[tb_start_tyrano_code]
;結果パネル用プログラムをロードします
[loadcss file="./data/others/r_panel/main.css"]
[loadjs storage="./r_panel/main.js"]
[_tb_end_tyrano_code]

[bg  storage="room.jpg"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
分析結果を確認するパネルを作りました。[p]
どうかしら?[p]
[_tb_end_text]

[tb_start_text mode=1 ]
パラメーターに足したり引いたり...!?[p]
[_tb_end_text]

[iscript]
// 各項目に加算減算する方法です
sf.big5_nums[0] += 20;
sf.big5_nums[1] -= 50;
[endscript]

[tb_start_tyrano_code]
[if exp="sf.big5_nums[0]>80"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
結果A[p]
0が80を超えている!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[elsif exp="sf.big5_nums[0]>60"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
結果B[p]
0が60を超えている!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[else]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
結果C[p]
それ以外です!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
結果発表ー!![p]
[_tb_end_text]

[iscript]
togglePanel();
[endscript]

[s  ]
