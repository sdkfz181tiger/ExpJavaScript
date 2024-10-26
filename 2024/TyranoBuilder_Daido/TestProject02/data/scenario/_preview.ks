[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[cm  ]
[iscript]
// 分析の最終結果を格納する配列
// この配列の値に加算、減算するよ!!
sf.forces = [30, 20, 80, 50, 0];
[endscript]

[bg  storage="room.jpg"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
分析結果を表示します。[p]
[_tb_end_text]

[tb_start_tyrano_code]
[loadcss file="./data/others/r_panel/main.css"]
[loadjs storage="./r_panel/main.js"]
[_tb_end_tyrano_code]

[s  ]
