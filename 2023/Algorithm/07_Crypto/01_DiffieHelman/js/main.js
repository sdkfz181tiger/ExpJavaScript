console.log("Hello, JavaScript!!");

// DiffieHelman共通鍵交換法を使ってみる
//    大きな数字の計算になるので、BigIntを利用する事

//==========
// Step1_公開鍵を作る

const PUB_KEY_1 = 89n;// 素数(大きな数字が望ましい)
const PUB_KEY_2 = 14n;// PUB_KEY_1より小さい数

//==========
// Step2_秘密鍵を使って計算する

// 2-1, 秘密鍵を作り計算する(UserA)
const priKeyA = 7n;// 秘密鍵
const mod1 = (PUB_KEY_2 ** priKeyA)%PUB_KEY_1;
console.log("mod1:", mod1);// 35

// 2-2, 秘密鍵を作り計算する(UserB)
const priKeyB = 9n;// 秘密鍵
const mod2 = (PUB_KEY_2 ** priKeyB)%PUB_KEY_1;
console.log("mod2:", mod2);// 7

//==========
// Step3_mod1,mod2を交換して共通鍵を作る

// 3-1, mod2を元にして共通鍵を作る(UserA)
const comKeyA = (mod2 ** priKeyA)%PUB_KEY_1;
console.log("共通鍵(UserA):", comKeyA);// 26

// 3-2, mod1を元にして共通鍵を作る(UserB)
const comKeyB = (mod1 ** priKeyB)%PUB_KEY_1;
console.log("共通鍵(UserB):", comKeyB);// 26

//==========
// 通信上に流れるデータは次のものだけであり、
// これらの情報から共通鍵を見つけることは計算上困難である。
//    PUB_KEY_1
//    PUB_KEY_2
//    mod1
//    mod2