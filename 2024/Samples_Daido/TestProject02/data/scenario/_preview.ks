[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[cm  ]
[iscript]
// 分析の最終結果を格納する配列
// この配列の値に加算、減算するよ!!
sf.big5_keys = ["外交性", "協調性", "勤勉性", "情動性", "創造性"];
sf.big5_nums = [10, 20, 30, 40, 50];
[endscript]

[bg  storage="room.jpg"  time="1000"  ]
[tb_start_tyrano_code]
[loadcss file="./data/others/r_panel/main.css"]
[loadjs storage="./r_panel/main.js"]
[_tb_end_tyrano_code]

[tb_show_message_window  ]
[tb_start_text mode=1 ]
分析結果を確認するパネルを作りました。[p]
どうかしら?[p]
[_tb_end_text]

[s  ]
