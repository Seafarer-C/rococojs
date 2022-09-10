import {
  Rococo2DView,
  Rect,
  RococoImage,
  ZoomWidget,
  RectDrawWidget,
  Line,
  Path,
  BrushWidget,
} from "@rococojs/2d";

window.onload = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const zoomWidget = new ZoomWidget().setStyle({
    left: "0px",
  });
  const rectdrawWidget = new RectDrawWidget().setStyle({
    left: "0px",
    top: "92px",
  });
  const brushWidget = new BrushWidget().setStyle({
    left: "0px",
    top: "138px",
  });

  const canvas = new Rococo2DView(document.getElementById("canvas"), {
    width,
    height,
    widgets: [zoomWidget, rectdrawWidget, brushWidget],
  });
  const rect = new Rect({
    top: 200,
    left: 1000,
    width: 60,
    height: 60,
    fill: "#8920a580",
    rx: 10,
    ry: 10,
    angle: 45,
  });

  const line = new Line([0, 0, 170, 200], {
    top: 400,
    left: 985,
    strokeWidth: 2,
    strokeStyle: "red",
    fillStyle: "red",
  });

  const path = new Path(
    [
      ["M", 0, 0],
      ["L", 200, 100],
      ["L", 170, 200],
    ],
    {
      fill: null,
      stroke: "red",
      strokeWidth: 2,
      top: 400,
      left: 1000,
      // strokeLineCap: this.strokeLineCap,
      // strokeMiterLimit: this.strokeMiterLimit,
      // strokeLineJoin: this.strokeLineJoin,
      // strokeDashArray: this.strokeDashArray,
    }
  );

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
    canvas.add(rect).add(path).add(line);
  }, 1200);
};
