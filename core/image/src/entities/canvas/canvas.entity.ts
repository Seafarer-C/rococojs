import { ICanvasAgent } from "../../interfaces/canvas/canvas.interface";
import { IShape } from "../../interfaces/shapes/shape.interface";

export class CanvasAgent implements ICanvasAgent {
  // canvas 实例
  canvas;
  // canvas 2d 上下文
  ctx;
  width: number;
  height: number;

  // 缩放比
  scale: number = 1;
  // 上一次的缩放比
  preScale: number = 1;
  // 每次缩放的步长
  scaleStep: number = 0.2;
  // 最大缩放比
  scaleMax: number = 8;
  scaleMin: number = 0.4;
  // 光标位置
  mousePosition: {
    x: number;
    y: number;
  } = { x: undefined, y: undefined };
  // 偏移量
  offset: {
    x: number;
    y: number;
  } = { x: 0, y: 0 };
  currentOffset: {
    x: number;
    y: number;
  } = { x: 0, y: 0 };

  // 画布中的元素
  shapes: Array<IShape>;
  // 高亮选中对象
  private _heightLightTarget: IShape;

  get heightLightTarget() {
    return this._heightLightTarget;
  }
  set heightLightTarget(target) {
    this._heightLightTarget = target;
    this._drawCanvas();
  }

  // 初始化画布，并注入上下文
  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.style = `position: absolute; margin-top: 0; margin-left: 0;`;
    this.ctx = this.canvas.getContext("2d");
  }

  // 进行绘制
  draw(shapes: Array<IShape>) {
    this.shapes = shapes;
    this._drawCanvas();
  }
  /**
   * 根据素材进行绘制
   */
  private _drawCanvas() {
    this.clearCanvas();
    this.ctx.translate(this.offset.x, this.offset.y);
    this.ctx.scale(this.scale, this.scale);
    this.shapes.forEach((shape) => {
      shape.draw();
    });
    if (this.heightLightTarget) {
      this.heightLightTarget.setHeightLight(true);
    }
  }
  // 清空画布
  clearCanvas() {
    this.canvas.width = this.width;
  }
  // 重制画布
  resetCanvas() {
    this.clearCanvas();
    this._drawCanvas();
  }

  private zoom(is_mouse) {
    this.clearCanvas();
    // 是否居中放大
    if (!is_mouse) {
      this.mousePosition.x = this.width / 2;
      this.mousePosition.y = this.height / 2;
    }

    this.offset.x =
      this.mousePosition.x -
      ((this.mousePosition.x - this.offset.x) * this.scale) / this.preScale;
    this.offset.y =
      this.mousePosition.y -
      ((this.mousePosition.y - this.offset.y) * this.scale) / this.preScale;

    this._drawCanvas();
    this.preScale = this.scale;
    this.currentOffset.x = this.offset.x;
    this.currentOffset.y = this.offset.y;
  }

  // 放大
  zoomIn(is_mouse) {
    if (this.scaleMax > this.scale) {
      this.scale += this.scaleStep;
      this.zoom(is_mouse);
    } else {
      return;
    }
  }

  // 缩小
  zoomOut(is_mouse) {
    if (this.scaleMin < this.scale) {
      this.scale -= this.scaleStep;
      this.zoom(is_mouse);
    } else {
      return;
    }
  }
}
