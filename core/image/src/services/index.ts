import type { IMaterial } from "../interfaces/shapes/material.interface";
import type { IMark } from "../interfaces/shapes/mark.interface";
import { Material } from "../entities/shapes/material.entity";
import { Mark } from "../entities/shapes/mark.entity";
import { throttle, orderBy } from "lodash-es";
import { ActionService } from "./action.service";
import { CanvasAgent } from "../entities/canvas/canvas.entity";
import { IShape } from "../interfaces/shapes/shape.interface";
import { contextValue } from "../context";

/**
 * 1. 使用一个 canvas 实现图层功能
 * 2. 实现图片一步加载，图片加载不会阻塞整体画布
 */
export class SuperMarker {
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
    this.setAction("drag");

    setTimeout(() => {
      this.setAction("move");
      this.setHeightLightTarget(this.materials[0]);
    }, 2000);
  }

  // 画布代理对象
  canvasAgent = new CanvasAgent();

  // 画布操作相关的服务类
  private actionService = new ActionService();

  // 容器
  containView;
  private _width: number;
  private _height: number;

  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
    this.containView.style.width = w + "px";
    this.canvasAgent.width = w;
  }

  get height() {
    return this._height;
  }
  set height(h) {
    this._height = h;
    this.containView.style.height = h + "px";
    this.canvasAgent.height = h;
  }

  // 光标位置
  @contextValue("mousePosition")
  mousePosition: {
    x: number;
    y: number;
  };

  // 高亮显示的对象（素材或者标注）
  get heightLightTarget() {
    return this.canvasAgent.heightLightTarget;
  }
  set heightLightTarget(v) {
    this.canvasAgent.heightLightTarget = v;
  }

  // 素材资源
  materials: Array<Material> = [];
  // 标注信息
  marks: Array<IMark> = [];
  // 是否显示标注
  showMark: Boolean = true;

  // 创建画布
  createCanvas() {
    this.canvasAgent.init();
    this.containView.appendChild(this.canvasAgent.canvas);
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

  /********* 加载与绘制 *********/

  // 初始化加载素材
  loadMaterials(infos: Array<IMaterial>): this {
    infos.forEach(async (info: IMaterial, index) => {
      const material = new Material();
      this.materials.push(material);
      await material.load({
        ...info,
        zIndex: info.zIndex || index,
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
      mark.load(info);
      this.marks.push(mark);
      this.marks = orderBy(this.marks, "zIndex");
    });
    this.drawThrottle();
    return this;
  }
  // 节流绘制
  drawThrottle = throttle(this.drawCanvas, 200, { trailing: true });

  /**
   * 根据素材进行绘制
   * @param drawMark 是否绘制标注
   */
  drawCanvas() {
    const shapes: Array<IShape> = this.materials;
    if (this.showMark) {
      shapes.push(...this.marks);
    }
    this.canvasAgent.draw(shapes);
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

  /********* 画布操作 *********/

  clearCanvas = this.canvasAgent.clearCanvas.bind(this.canvasAgent);
  resetCanvas = this.canvasAgent.resetCanvas.bind(this.canvasAgent);

  zoomIn = this.canvasAgent.zoomIn.bind(this.canvasAgent);
  zoomOut = this.canvasAgent.zoomOut.bind(this.canvasAgent);

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
