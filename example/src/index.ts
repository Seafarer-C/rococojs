import { SuperMarkView } from "@super-mark/image";
import { default as data } from "./data.json";

const markView = new SuperMarkView({
  el: "view",
  width: 800,
  height: 800,
});

setTimeout(() => {
  // markView.setSize(document.body.offsetWidth, document.body.offsetHeight);
}, 2000);

markView.loadMaterials(data.materials).loadMarks(data.marks);
