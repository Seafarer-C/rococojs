// import { SuperMarkView } from "@super-mark/image";
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

import { Rococo2DView, Rect, RococoImage } from "@super-mark/2d";
const canvas = new Rococo2DView(document.getElementById("canvas"), {});
const rect = new Rect({
  top: 200,
  left: 100,
  width: 100,
  height: 100,
  stroke: "red",
  fill: "#ffffff00",
  rx: 20,
  ry: 20,
});

const image = new Image();
image.src =
  "https://image-static.segmentfault.com/289/215/2892151181-5ab48de7b5013_fix732";
const img = new RococoImage(image, {
  top: 300,
  left: 100,
  width: 100,
  height: 100,
  angle: 45,
});

image.onload = () => {
  canvas.add(img).add(rect);
};
