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

// 拡大,縮小するサンプル
let scaleDirection = 1; // 拡大・縮小の方向
app.ticker.add(() => {
  sprite.scale.x += 0.01 * scaleDirection;
  sprite.scale.y += 0.01 * scaleDirection;

  // 拡大・縮小の切り替え
  if (sprite.scale.x > 1.5 || sprite.scale.x < 0.5) {
    scaleDirection *= -1;
  }
});
