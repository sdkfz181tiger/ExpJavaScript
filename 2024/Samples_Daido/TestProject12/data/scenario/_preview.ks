[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[cm  ]
[iscript]
// 分析の最終結果を格納する配列
// この配列の値に加算、減算するよ!!
let key1 = ["外交性","内向的","両向的","外交的"];
let key2 = ["誠実性","誠実","中立","不誠実"];
let key3 = ["解放性","想像的","現実的","保守的"];
let key4 = ["調和性","協力的","受動的","非協力的"];
let key5 = ["感情の安定","安定","変動的","不安定"];
sf.big5_keys = [key1,key2,key3,key4,key5];
// 各項目の初期値です
sf.big5_nums = [50, 50, 50, 50, 50];
[endscript]

[tb_start_tyrano_code]
;結果パネル用プログラムをロードします
[loadcss file="./data/others/r_panel/main.css"]
[loadjs storage="./r_panel/main.js"]
[_tb_end_tyrano_code]

[iscript]
// 初期状態でパネルを開いておきます
openPanel();// パネルを表示します
//closePanel();// パネルを隠すときはこちら
[endscript]

[bg  storage="room.jpg"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
分析結果を右上に固定表示するパターンです。[p]
どうかしら?[p]
[_tb_end_text]

[tb_start_text mode=1 ]
外交性にプラス!![p]
協調性にマイナス!![p]
勤勉性にプラス!![p]
情動性にマイナス!![p]
創造性にプラス!![p]
[_tb_end_text]

[iscript]
// 各項目に加算減算する方法です(関数で実行します)
addForce(0, 30);// 0番目にプラス
addForce(1, -30);// 1番目にマイナス
addForce(2, 30);// 2番目にプラス
addForce(3, -30);// 3番目にマイナス
addForce(4, 30);// 4番目にプラス
[endscript]

[tb_start_text mode=1 ]
結果発表ー!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[if exp="sf.big5_nums[0]>80"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
0が80を超えている!![p]
結果Aのキャラを出します[p]
[_tb_end_text]

[tb_start_tyrano_code]
[elsif exp="sf.big5_nums[0]>60"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
0が60を超えている!![p]
結果Bのキャラを出します[p]
[_tb_end_text]

[tb_start_tyrano_code]
[else]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
それ以外です!![p]
結果Cのキャラを出します[p]
[_tb_end_text]

[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
現場からは以上です!![p]
[_tb_end_text]

[s  ]
