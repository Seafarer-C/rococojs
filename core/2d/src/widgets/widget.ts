import { Util } from "../base/utils";

export class Widget {
  dom: HTMLElement;
  innerHTML = ``;
  rococo2d;
  style = {};

  setStyle(style: Object) {
    for (const key in style) {
      this.style[key] = style[key];
    }
    if (this.dom) {
      Util.setStyle(this.dom, style);
    }
    return this;
  }

  mount() {
    Util.setStyle(this.dom, this.style);
    this.onMounted();
  }

  onMounted() {}
}
