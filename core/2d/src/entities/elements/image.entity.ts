import { Shape } from "../../base/shape";
import { Util } from "../../base/utils";

export class RococoImage extends Shape {
  public type: string = "image";
  public _element: HTMLImageElement;
  /** 默认通过 img 标签来绘制，因为最终都是要通过该标签绘制的 */
  constructor(element: HTMLImageElement, options) {
    super(options);
    this._initElement(element, options);
  }
  _initElement(element: HTMLImageElement, options) {
    this.setElement(element, options);
  }
  setElement(element: HTMLImageElement, options) {
    this._element = element;
    this._initConfig(options);
    return this;
  }
  _initConfig(options = {}) {
    this.setOptions(options);
    this._setWidthHeight(options);
  }
  /** 设置图像大小 */
  _setWidthHeight(options) {
    this.width =
      "width" in options
        ? options.width
        : this.getElement()
        ? this.getElement().width || 0
        : 0;
    this.height =
      "height" in options
        ? options.height
        : this.getElement()
        ? this.getElement().height || 0
        : 0;
  }
  getElement() {
    return this._element;
  }
  /** 直接调用 drawImage 绘制图像 */
  _render(ctx: CanvasRenderingContext2D, noTransform: boolean = false) {
    let x, y;

    x = noTransform ? this.left : -this.width / 2;
    y = noTransform ? this.top : -this.height / 2;

    if (this._element?.complete) {
      ctx.drawImage(this._element, x, y, this.width, this.height);
    } else {
      // 当图片素材未加载完毕，先绘制骨架
      const rx = 2,
        ry = 2,
        w = this.width,
        h = this.height;
      ctx.beginPath();
      ctx.moveTo(x + rx, y);
      ctx.lineTo(x + w - rx, y);
      ctx.bezierCurveTo(x + w, y, x + w, y + ry, x + w, y + ry);
      ctx.lineTo(x + w, y + h - ry);
      ctx.bezierCurveTo(x + w, y + h, x + w - rx, y + h, x + w - rx, y + h);
      ctx.lineTo(x + rx, y + h);
      ctx.bezierCurveTo(x, y + h, x, y + h - ry, x, y + h - ry);
      ctx.lineTo(x, y + ry);
      ctx.bezierCurveTo(x, y, x + rx, y, x + rx, y);
      ctx.closePath();
      ctx.strokeStyle = "#e8e8e860";
      ctx.fillStyle = "#90909060";
      ctx.fill();
      ctx.stroke();
      ctx.drawImage(this._element, x, y, this.width, this.height);
      this._element.onload = () => {
        this.canvas.renderAll();
      };
    }
  }
  /** 如果是根据 url 或者本地路径加载图像，本质都是取加载图片完成之后在转成 img 标签 */
  static fromURL(url, callback, imgOptions) {
    Util.loadImage(url).then((img) => {
      callback &&
        callback(new RococoImage(img as HTMLImageElement, imgOptions));
    });
  }
  static async = true;
}
