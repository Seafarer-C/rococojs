// import { SuperMarkView } from "@rococojs/image";
// import { default as data } from "./data.json";

// const markView = new SuperMarkView({
//   el: "view",
//   width: 800,
//   height: 800,
// });

// setTimeout(() => {
//   // markView.setSize(document.body.offsetWidth, document.body.offsetHeight);
// }, 2000);

// markView.loadMaterials(data.materials).loadMarks(data.marks);

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
const rect = new Rect({
  top: 100,
  left: 450,
  width: 800,
  height: 60,
  fill: "#ffffff",
  rx: 10,
  ry: 10,
  // angle: 45,
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
  canvas.add(img).add(rect);
  zoomWidget;
};
