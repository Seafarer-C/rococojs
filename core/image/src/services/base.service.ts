import type { ISuperMarker } from "../interfaces/base.interface";
import type { IMaterial } from "../interfaces/shapes/material.interface";
import type { IMark } from "../interfaces/shapes/mark.interface";
import { Material } from "../entities/shapes/material.entity";
import { Mark } from "../entities/shapes/mark.entity";
import { throttle, orderBy } from "lodash-es";
import { ActionService } from "./action.service";

/**
 * 1. 使用一个 canvas 实现图层功能
 * 2. 实现图片一步加载，图片加载不会阻塞整体画布
 */
export class SuperMarker implements ISuperMarker {
  constructor(info: { el: string; width: number; height: number }) {
    const { el, width, height } = info;
    this.containView = document.getElementById(el);
    // 创建素材画布
    this.createCanvas();
    this.width = width;
    this.height = height;

    // 常驻监听滚轮事件
    this.containView.addEventListener(
      document.mozFullScreen ? "DOMMouseScroll" : "mousewheel",
      this.mousewheelEvent.bind(this)
    );
    // 加载操作类
    this.actionService.load(this);

    setTimeout(() => {
      this.setAction("drag");
      this.setHeightLightTarget(this.materials[0]);
    }, 2000);
  }

  // 画布操作相关的服务类
  private actionService = new ActionService<this>();

  private _width: number;
  private _height: number;

  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
    this.containView.style.width = w + "px";
    this.canvas.width = w;
  }

  get height() {
    return this._height;
  }
  set height(h) {
    this._height = h;
    this.containView.style.height = h + "px";
    this.canvas.height = h;
  }

  // 缩放比
  scale: number = 1;
  // 上一次的缩放比
  preScale: number = 1;
  // 每次缩放的步长
  scaleStep: number = 0.2;
  // 最大缩放比
  scaleMax: number = 8;
  scaleMin: number = 0.4;
  // 容器
  containView;
  // canvas 实例
  canvas;
  // canvas 2d 上下文
  ctx;
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

  // 素材资源
  materials: Array<Material> = [];
  // 标注信息
  marks: Array<IMark> = [];
  // 是否显示标注
  showMark: Boolean = true;

  // 高亮显示的对象（素材或者标注）
  heightLightTarget: IMark | IMaterial = undefined;

  // 创建画布
  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.style = `position: absolute; margin-top: 0; margin-left: 0;`;
    const ctx = canvas.getContext("2d");
    this.containView.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = ctx;
  }
  /**
   * 设置画布及容器大小
   * @param width 宽度
   * @param height 高度
   */
  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.drawCanvas();
  }
  // 清空画布
  clearCanvas() {
    this.canvas.width = this.width;
  }

  // 重制画布
  resetCanvas() {
    this.clearCanvas();
    this.drawCanvas();
  }

  /********* 加载与绘制 *********/

  // 初始化加载素材
  loadMaterials(infos: Array<IMaterial>): this {
    infos.forEach(async (info: IMaterial, index) => {
      const material = new Material();
      this.materials.push(material);
      await material.load({
        ...info,
        zIndex: info.zIndex || index,
        ctx: this.ctx,
      });
      this.materials = orderBy(this.materials, "zIndex");
      this.drawThrottle();
    });
    return this;
  }

  // 初始化加载标注
  loadMarks(infos: Array<IMark>): this {
    infos.forEach((info: Mark) => {
      const mark = new Mark();
      mark.load({
        ...info,
        ctx: this.ctx,
      });
      this.marks.push(mark);
      this.marks = orderBy(this.marks, "zIndex");
      if (this.showMark) {
        mark.draw();
      }
    });
    return this;
  }
  // 节流绘制
  drawThrottle = throttle(this.drawCanvas, 200, { trailing: true });

  /**
   * 根据素材进行绘制
   * @param drawMark 是否绘制标注
   */
  drawCanvas() {
    this.clearCanvas();
    this.ctx.translate(this.offset.x, this.offset.y);
    this.ctx.scale(this.scale, this.scale);
    this.materials.forEach((material) => {
      material.draw();
    });
    if (this.showMark) {
      this.marks.forEach((mark) => {
        mark.draw();
      });
    }
    if (this.heightLightTarget) {
      this.heightLightTarget.setHeightLight(true);
    }
  }

  /********* 画布缩放 *********/

  // 滚轮事件
  private mousewheelEvent(e) {
    this.mousePosition.x = e.offsetX;
    this.mousePosition.y = e.y;
    let b = true;
    if (e.wheelDelta) {
      b = e.wheelDelta > 0;
    } else {
      b = e.detail < 0;
    }
    if (b) {
      this.zoomIn(true);
    } else {
      this.zoomOut(true);
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
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

    this.drawCanvas();
    this.preScale = this.scale;
    this.currentOffset.x = this.offset.x;
    this.currentOffset.y = this.offset.y;
  }

  private zoomIn(is_mouse) {
    if (this.scaleMax > this.scale) {
      this.scale += this.scaleStep;
      this.zoom(is_mouse);
    } else {
      return;
    }
  }

  private zoomOut(is_mouse) {
    if (this.scaleMin < this.scale) {
      this.scale -= this.scaleStep;
      this.zoom(is_mouse);
    } else {
      return;
    }
  }

  /********* 画布操作 *********/

  setAction = this.actionService.setAction.bind(this.actionService);
  setMarkType = this.actionService.setMarkType.bind(this.actionService);

  setHeightLightTarget(target?: IMaterial | IMark) {
    if (target) {
      this.heightLightTarget = target;
    } else {
      this.heightLightTarget = undefined;
    }
    this.drawCanvas();
  }
}
