[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[mask_off time=10]
[cm  ]
[iscript]
// 5フォース分析の最終結果を格納する配列
// この配列の値に加算、減算するよ!!
sf.forces = [0, 0, 0, 0, 0];
[endscript]

[bg  storage="room.jpg"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
変数に値を加算したり減算したり...!?[p]
[_tb_end_text]

[iscript]
sf.forces[0] += 100;// 0番目に加算
sf.forces[1] += 100;
console.log("forces:", sf.forces);
[endscript]

[tb_start_text mode=1 ]
結果発表ー!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[if exp="sf.forces[0]>90 && sf.forces[1]>90"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
0番目と1番目が90を超えているので、[p]
大吉エンド!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[elsif exp="sf.forces[0]>90"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
0番目は90を超えているので、[p]
大吉エンド!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[elsif exp="sf.forces[0]>50"]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
0番目が50を超えているので、[p]
吉エンド!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[else]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
どれでもありません...[p]
バッドエンド確定ー!![p]
[_tb_end_text]

[tb_start_tyrano_code]
[endif]
[_tb_end_tyrano_code]

[tb_start_text mode=1 ]
現場からは以上です。。。[p]
[_tb_end_text]

[s  ]
