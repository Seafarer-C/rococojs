import { contextValue } from "../../context";
import type { ICanvasAgent } from "../../interfaces/canvas/canvas.interface";
import { IMaterial } from "../../interfaces/shapes/material.interface";
import type { IShape } from "../../interfaces/shapes/shape.interface";

export class CanvasAgent implements ICanvasAgent {
  // canvas 实例
  canvas;
  // canvas 2d 上下文
  @contextValue("canvasCtx")
  ctx;

  private _width: number;
  private _height: number;

  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
    this.canvas.width = w;
  }

  get height() {
    return this._height;
  }
  set height(h) {
    this._height = h;
    this.canvas.height = h;
  }

  // 缩放比
  private scale: number = 1;
  // 上一次的缩放比
  private preScale: number = 1;
  // 每次缩放的步长
  private scaleStep: number = 0.2;
  // 最大缩放比
  private scaleMax: number = 8;
  private scaleMin: number = 0.4;
  // 光标位置
  @contextValue("mousePosition")
  private mousePosition: {
    x: number;
    y: number;
  };
  // 偏移量
  @contextValue("offset")
  private offset: {
    x: number;
    y: number;
  };
  @contextValue("currentOffset")
  private currentOffset: {
    x: number;
    y: number;
  };

  // 画布中的元素
  private shapes: Array<IShape> = [];
  // 高亮选中对象
  private _heightLightTarget: IShape;

  get heightLightTarget() {
    return this._heightLightTarget;
  }
  set heightLightTarget(target) {
    this._heightLightTarget = target;
    this._drawCanvas();
  }

  // 初始化画布
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
      const { x, y } = shape.position;
      const { width, height } = shape.size;
      switch (shape.type) {
        case "image":
          if ((shape as IMaterial).complete) {
            const { x, y } = shape.position;
            this.ctx.drawImage((shape as IMaterial).img, x, y, width, height);
          }
          break;
        case "arrow":
          break;
        case "circle":
          this.ctx.beginPath();
          this.ctx.strokeStyle = "#FFA500";
          this.ctx.arc(x, y, 100, 0, Math.PI * 2, true);
          this.ctx.stroke();
          break;
        case "line":
          this.ctx.beginPath();
          this.ctx.closePath();
          // 通过线条来绘制图形轮廓。
          // stroke()
          // 填充
          // fill()
          break;
        case "rect":
          // fillRect(x, y, width, height)

          // strokeRect(x, y, width, height)

          // clearRect(x, y, width, height)
          break;
        case "text":
          break;
      }
    });
    if (this.heightLightTarget) {
      const { x, y } = this.heightLightTarget.position;
      const { width, height } = this.heightLightTarget.size;
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(x, y, width, height);
    }
  }
  // 清空画布
  clearCanvas() {
    this.canvas.width = this.width;
  }
  // 重制画布
  resetCanvas() {
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
