import {
  Rococo2DView,
  Rect,
  RococoImage,
  ZoomWidget,
  RectDrawWidget,
} from "@rococojs/2d";

const zoomWidget = new ZoomWidget().setStyle({
  right: "0px",
});
const rectdrawWidget = new RectDrawWidget().setStyle({
  right: "0px",
  top: "100px",
});

const canvas = new Rococo2DView(document.getElementById("canvas"), {
  width: 1600,
  height: 1000,
  widgets: [zoomWidget, rectdrawWidget],
});
const rect1 = new Rect({
  top: 245,
  left: 400,
  width: 60,
  height: 60,
  fill: "#8920a580",
  rx: 10,
  ry: 10,
  angle: 45,
});

const imgs: Array<RococoImage> = [
  {
    src: "https://fabrie-prod.oss-cn-shanghai.aliyuncs.com/image/61de5a0bcb60742ee8c98b6b/1642411781348-0.6689313774101535",
    top: 300,
    left: 250,
    width: 300,
    height: 500,
  },
  {
    src: "https://fabrie-prod.oss-cn-shanghai.aliyuncs.com/image/61de5a0bcb60742ee8c98b6b/1642413324130-0.5006085671887177",
    top: 150,
    left: 600,
    width: 400,
    height: 200,
  },
  {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-171452-2678.jpg",
    top: 700,
    left: 250,
    width: 300,
    height: 300,
  },
  {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165904-3a69.jpg",
    top: 400,
    left: 500,
    width: 200,
    height: 300,
  },
  {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165934-5ad5.jpg",
    top: 400,
    left: 700,
    width: 200,
    height: 300,
  },
  {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165939-1986.jpg",
    top: 700,
    left: 500,
    width: 200,
    height: 300,
  },
  {
    src: "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220908-165947-d938.jpg",
    top: 700,
    left: 700,
    width: 200,
    height: 300,
  },
].map(({ src, ...ops }) => {
  const img = new Image();
  img.src = src;
  return new RococoImage(img, ops);
});

setTimeout(() => {
  imgs.forEach((img) => {
    canvas.add(img);
  });
  canvas.add(rect1);
}, 1200);
