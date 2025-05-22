console.log("main.js");

const W = 320;
const H = 240;
const cX = W / 2;
const cY = H / 2;
const imgPiyo = "images/piyo01.png";

const app = new PIXI.Application();
await app.init({ width: W, height: H });
document.body.appendChild(app.canvas);

await PIXI.Assets.load(imgPiyo);
const sprite = PIXI.Sprite.from(imgPiyo);
sprite.x = cX;
sprite.y = cY;
sprite.anchor.set(0.5);
app.stage.addChild(sprite);

// 円運動するサンプル
let elapsed = 0.0;
app.ticker.add((ticker) => {
	elapsed += ticker.deltaTime;
	sprite.x = cX + Math.cos(elapsed/30.0) * 80.0;
	sprite.y = cY + Math.sin(elapsed/50.0) * 80.0;
});