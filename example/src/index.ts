import { Rococo2DView, Rect, RococoImage, ZoomWidget } from "@rococojs/2d";

const zoomWidget = new ZoomWidget().setStyle({
  // "margin-top": "10px",
  right: "0px",
});

const canvas = new Rococo2DView(document.getElementById("canvas"), {
  width: 1600,
  height: 600,
  widgets: [zoomWidget],
});
const rect1 = new Rect({
  top: 100,
  left: 100,
  width: 60,
  height: 60,
  fill: "#1890ff",
  rx: 10,
  ry: 10,
  angle: 45,
});
const rect2 = new Rect({
  top: 100,
  left: 200,
  width: 60,
  height: 60,
  fill: "#1890ff",
  rx: 10,
  ry: 10,
  angle: 45,
});
const rect3 = new Rect({
  top: 100,
  left: 300,
  width: 60,
  height: 60,
  fill: "#1890ff",
  rx: 10,
  ry: 10,
  angle: 45,
});
const rect4 = new Rect({
  top: 100,
  left: 400,
  width: 60,
  height: 60,
  fill: "#1890ff",
  rx: 10,
  ry: 10,
  angle: 45,
});

const image = new Image();
image.src =
  "https://st-gdx.dancf.com/gaodingx/4449/configs/activity/20220826-190627-0e58.png";
const img = new RococoImage(image, {
  top: 400,
  left: 500,
  width: 900,
  height: 500,
});

image.onload = () => {
  canvas.add(img).add(rect1).add(rect2).add(rect3).add(rect4);
  zoomWidget;
};
