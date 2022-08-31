import { Util } from "../base/utils";

export class Widget {
  dom: HTMLElement;
  innerHTML = ``;
  rococoCanvas;
  style;

  setStyle(style: Object) {
    this.style = style;
    if (this.dom) {
      Util.setStyle(this.dom, style);
    }
    return this;
  }
}
