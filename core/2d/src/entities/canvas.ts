import { Util } from "../base/utils";
import { Point } from "../base/point";
import { Shape } from "../base/shape";
import { Group } from "../base/group";
import {
  Offset,
  Pos,
  GroupSelector,
  CurrentTransform,
} from "../base/interface";
import { EventCenter } from "../base/event";
import DefaultPlugin from "../plugins/default.plugin";
import { Widget } from "../widgets/widget";

const STROKE_OFFSET = 0.5;
// 鼠标手势
const cursorMap = {
  tr: "ne-resize",
  br: "se-resize",
  bl: "sw-resize",
  tl: "nw-resize",
  ml: "w-resize",
  mt: "n-resize",
  mr: "e-resize",
  mb: "s-resize",
};
/** 一些鼠标样式 */
enum CursorStyle {
  default = "default",
  move = "move",
  hover = "move",
  rotation = "crosshair",
}

export class Canvas extends EventCenter {
  constructor(el: HTMLElement, options) {
    super();
    // 初始化配置
    this.wrapperElement = el;
    this._initConfig(options);
    // 初始化下层画布 main-canvas
    this._initMainCanvas();
    // 初始化上层画布 top-canvas
    this._initInteractiveCanvas();
    // 初始化缓冲层画布
    this._initCacheCanvas();
    // 处理模糊问题
    this._initRetinaScaling();
  }

  //#region 属性字段
  /** 画布宽度 */
  public width: number;
  /** 画布高度 */
  public height: number;
  /** 包围 canvas 的外层 div 容器 */
  public wrapperElement: HTMLElement;
  /** 下层 canvas 画布，主要用于绘制所有物体 */
  public mainCanvas: HTMLCanvasElement;
  /** 上层 canvas，主要用于监听鼠标事件、涂鸦模式、左键点击拖蓝框选区域 */
  public topCanvas: HTMLCanvasElement;
  /** 上层画布环境 */
  public tCtx: CanvasRenderingContext2D;
  /** 下层画布环境 */
  public mCtx: CanvasRenderingContext2D;
  /** 缓冲层画布环境，方便某些情况方便计算用的，比如检测物体是否透明 */
  public cacheCanvas: HTMLCanvasElement;
  public cCtx: CanvasRenderingContext2D;

  public viewportTransform: number[] = [1, 0, 0, 1, 0, 0];
  public vptCoords: {};

  /** 左键拖拽的产生的选择区域，拖蓝区域 */
  private _groupSelector: GroupSelector;
  /** 当前选中的组 */
  public _activeGroup: Group;

  /** 画布中所有添加的物体 */
  private _shapes: Shape[] = [];
  /** 整个画布距离原点的偏移量 */
  private _offset: Offset;
  /** 当前物体的变换信息，src 目录下中有截图 */
  private _currentTransform: CurrentTransform;
  /** 当前激活物体 */
  private _activeShape;
  /** 变换之前的中心点方式 */
  // private _previousOriginX;
  private _previousPointer: Pos;

  /**
   * Window.devicePixelRatio
   * Window 接口的**devicePixelRatio
   *  返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。
   *  此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小。
   *  简单来说，它告诉浏览器应使用多少屏幕实际像素来绘制单个 CSS 像素。
   */
  private dpr: number = window.devicePixelRatio;
  // 缩放比
  private scale: number = 1;
  // 上一次的缩放比
  private preScale: number = 1;

  // 距离画布原点的偏移量
  private _canvasOffset: Offset = {
    left: 0,
    top: 0,
  };

  /**************  可配置部分  **************/
  /** 选择区域框的背景颜色 */
  public selectionColor: string = "#0c99ff26";
  /** 选择区域框的边框颜色 */
  public selectionBorderColor: string = "#0c99ff";
  /** 选择区域的边框大小，拖蓝的线宽 */
  public selectionLineWidth: number = 1;
  // 每次缩放的步长
  private scaleStep: number = 0.2;
  // 最大缩放比
  private scaleMax: number = 8;
  private scaleMin: number = 0.4;

  // 插件
  private plugins = [DefaultPlugin];
  // 挂件
  private widgets: Array<Widget> = [];

  //#endregion

  //#region 初始化逻辑
  // 初始化配置
  private _initConfig(options: Object) {
    for (const key in options) {
      if (key === "plugins") {
        this.plugins.push(...options[key]);
      } else if (key === "widgets") {
        this.widgets.push(...options[key]);
        // 初始化挂件
        this._initWidgets();
      } else if (Object.prototype.hasOwnProperty.call(options, key)) {
        this[key] = options[key];
      }
    }
    this.wrapperElement.style.width = this.width + "px";
    this.wrapperElement.style.height = this.height + "px";
  }

  // 初始化挂载挂件
  private _initWidgets() {
    this.widgets.forEach((widget) => {
      widget.dom = document.createElement("div");
      widget.dom.innerHTML = widget.innerHTML;
      widget.dom.style.display = "initial";
      widget.dom.style.position = "absolute";
      widget.dom.style["zIndex"] = "10";
      this.wrapperElement.appendChild(widget.dom);
      widget.rococoCanvas = this;
      widget?.onMounted();
    });
  }

  // 初始化主画布
  private _initMainCanvas() {
    this.mainCanvas = document.createElement("canvas");
    this.wrapperElement.appendChild(this.mainCanvas);
    this._applyCanvasStyle(this.mainCanvas);
    this.mCtx = this.mainCanvas.getContext("2d");
    this.calcOffset();
  }

  // 初始化操作画布
  private _initInteractiveCanvas() {
    this._currentTransform = null;
    this._groupSelector = null;
    this.topCanvas = document.createElement("canvas");
    this.wrapperElement.appendChild(this.topCanvas);
    this._applyCanvasStyle(this.topCanvas);
    this.tCtx = this.topCanvas.getContext("2d");

    this._initEvents();
  }

  // 初始化缓冲画布
  private _initCacheCanvas() {
    this.cacheCanvas = document.createElement("canvas");
    this._applyCanvasStyle(this.cacheCanvas);
    this.cCtx = this.cacheCanvas.getContext("2d");
  }

  // 初始化视觉缩放比例
  private _initRetinaScaling() {
    const localInitRetinaScaling = (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D
    ) => {
      const { width, height } = this;
      // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点
      canvas.width = Math.round(width * this.dpr);
      canvas.height = Math.round(height * this.dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      // 直接用 scale 放大整个坐标系，相对来说就是放大了每个绘制操作
      ctx.scale(this.dpr, this.dpr);
    };
    localInitRetinaScaling(this.mainCanvas, this.mCtx);
    localInitRetinaScaling(this.topCanvas, this.tCtx);
    localInitRetinaScaling(this.cacheCanvas, this.cCtx);
  }
  // #endregion

  // #region 事件系统
  /** 给上层画布增加鼠标事件 */
  private _initEvents() {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);

    Util.addListener(window, "resize", this.handleWindowResize);
    Util.addListener(this.topCanvas, "mousedown", this.handleMouseDown);
    Util.addListener(this.topCanvas, "mousemove", this.handleMouseMove);
    Util.addListener(
      this.topCanvas,
      document.mozFullScreen ? "DOMMouseScroll" : "mousewheel",
      this.handleMouseWheel
    );
  }

  // 执行洋葱任务模型
  private _executeCompose(key: string, ctx: any) {
    // 虽然设计有返回值，但是并不关心因此不处理
    Util.compose(this.plugins.filter((p) => p[key]).map((p) => p[key]))(ctx);
  }

  // 鼠标下压事件
  private handleMouseDown(e: MouseEvent) {
    let pointer = Util.getPointer(e, this.topCanvas, this.scale);
    this._executeCompose("mouseDown", { e, pointer, rococoCanvas: this });
    Util.addListener(document, "mouseup", this.handleMouseUp);
    // 注销交互层 canvas 的监听事件，注册整个页面的事件，保证鼠标移动到屏幕外时 move 事件依旧执行
    Util.addListener(document, "mousemove", this.handleMouseMove);
    Util.removeListener(this.topCanvas, "mousemove", this.handleMouseMove);
  }
  // 鼠标移动事件
  private handleMouseMove(e: MouseEvent) {
    let pointer = Util.getPointer(e, this.topCanvas, this.scale);
    this._executeCompose("mouseMove", { e, pointer, rococoCanvas: this });
    e.preventDefault();
  }
  // 鼠标放开事件
  private handleMouseUp(e: MouseEvent) {
    this._executeCompose("mouseUp", { e, rococoCanvas: this });
    Util.removeListener(document, "mouseup", this.handleMouseUp);
    // 注销整个页面的事件，退回到只有交互层 canvas 事件舰艇，只在 canvas 内执行 move 事件
    Util.removeListener(document, "mousemove", this.handleMouseMove);
    Util.addListener(this.topCanvas, "mousemove", this.handleMouseMove);
  }
  // 鼠标滚轮事件
  private handleMouseWheel(e: MouseEvent) {
    let pointer = Util.getPointer(e, this.topCanvas, this.scale);
    this._executeCompose("mouseWheel", { e, pointer, rococoCanvas: this });
  }
  // 窗口缩放事件
  private handleWindowResize() {
    // TODO: 执行洋葱任务模型
    // this._executeCompose("", {canvas: this})
    this.calcOffset();
  }
  // #endregion

  // #region 缩放操作
  private zoom(is_mouse) {
    // 是否居中放大
    if (!is_mouse) {
      // this._offset.left = this.width / 2;
      // this._offset.top = this.height / 2;
    }

    // this.offset.x =
    //   this.mousePosition.x -
    //   ((this.mousePosition.x - this.offset.x) * this.scale) / this.preScale;
    // this.offset.y =
    //   this.mousePosition.y -
    //   ((this.mousePosition.y - this.offset.y) * this.scale) / this.preScale;

    this.renderAll();
    // this.preScale = this.scale;
    // this._currentOffset.x = this.offset.x;
    // this.currentOffset.y = this.offset.y;
  }
  // 放大
  zoomIn(is_mouse = false) {
    if (this.scaleMax > this.scale) {
      this.scale += this.scaleStep;
      this.zoom(is_mouse);
    } else {
      return;
    }
  }

  // 缩小
  zoomOut(is_mouse = false) {
    if (this.scaleMin < this.scale) {
      this.scale -= this.scaleStep;
      this.zoom(is_mouse);
    } else {
      return;
    }
  }
  // #endregion

  // #region 对象操作
  setActiveObject(object: Shape, e: MouseEvent): Canvas {
    if (this._activeShape) {
      // 如果当前有激活物体
      this._activeShape.setActive(false);
    }
    this._activeShape = object;
    object.setActive(true);

    this.renderAll();

    // this.emit('object:selected', { target: object, e });
    // object.emit('selected', { e });
    return this;
  }
  /** 使所有元素失活，并触发相应事件 */
  deactivateAllWithDispatch(): Canvas {
    // let activeObject = this.getActiveGroup() || this.getActiveObject();
    // if (activeObject) {
    //     this.emit('before:selection:cleared', { target: activeObject });
    // }
    this.deactivateAll();
    // if (activeObject) {
    //     this.emit('selection:cleared');
    // }
    return this;
  }
  /** 将所有物体设置成未激活态 */
  deactivateAll() {
    let allObjects = this._shapes,
      i = 0,
      len = allObjects.length;
    for (; i < len; i++) {
      allObjects[i].setActive(false);
    }
    this.discardActiveGroup();
    this.discardActiveObject();
    return this;
  }
  private _resetObjectTransform(target) {
    target.scaleX = 1;
    target.scaleY = 1;
    target.setAngle(0);
  }
  /** 清空所有激活物体 */
  discardActiveObject() {
    if (this._activeShape) {
      this._activeShape.setActive(false);
    }
    this._activeShape = null;
    return this;
  }
  /** 平移当前选中物体，注意这里我们没有用 += */
  private _translateObject(x: number, y: number) {
    // console.log(this._currentTransform.offsetX, this._currentTransform.offsetY, this._offset.top, this._offset.left);
    let target = this._currentTransform.target;
    target.set("left", x - this._currentTransform.offsetX);
    target.set("top", y - this._currentTransform.offsetY);
  }
  /**
   * 缩放当前选中物体
   * @param x 鼠标点 x
   * @param y 鼠标点 y
   * @param by 是否等比缩放，x | y | equally
   */
  private _scaleObject(x: number, y: number, by = "equally") {
    let t = this._currentTransform,
      offset = this._offset,
      target: Shape = t.target;

    // 缩放基点：比如拖拽右边中间的控制点，其实我们参考的变换基点是左边中间的控制点
    let constraintPosition = target.translateToOriginPoint(
      target.getCenterPoint(),
      t.originX,
      t.originY
    );
    // 以物体变换中心为原点的鼠标点坐标值
    let localMouse = target.toLocalPoint(
      new Point(x - offset.left, y - offset.top),
      t.originX,
      t.originY
    );

    if (t.originX === "right") {
      localMouse.x *= -1;
    } else if (t.originX === "center") {
      localMouse.x *= t.mouseXSign * 2;

      if (localMouse.x < 0) {
        t.mouseXSign = -t.mouseXSign;
      }
    }

    if (t.originY === "bottom") {
      localMouse.y *= -1;
    } else if (t.originY === "center") {
      localMouse.y *= t.mouseYSign * 2;

      if (localMouse.y < 0) {
        t.mouseYSign = -t.mouseYSign;
      }
    }

    // 计算新的缩放值，以变换中心为原点，根据本地鼠标坐标点/原始宽度进行计算，重新设定物体缩放值
    let newScaleX = target.scaleX,
      newScaleY = target.scaleY;
    if (by === "equally") {
      let dist = localMouse.y + localMouse.x;
      let lastDist =
        target.height * t.original.scaleY +
        target.width * t.original.scaleX +
        target.padding * 2 -
        target.strokeWidth * 2 +
        1; /* additional offset needed probably due to subpixel rendering, and avoids jerk when scaling an object */

      // We use t.scaleX/Y instead of target.scaleX/Y because the object may have a min scale and we'll loose the proportions
      newScaleX = (t.original.scaleX * dist) / lastDist;
      newScaleY = (t.original.scaleY * dist) / lastDist;

      target.set("scaleX", newScaleX);
      target.set("scaleY", newScaleY);
    } else if (!by) {
      newScaleX = localMouse.x / (target.width + target.padding);
      newScaleY = localMouse.y / (target.height + target.padding);

      target.set("scaleX", newScaleX);
      target.set("scaleY", newScaleY);
    } else if (by === "x") {
      newScaleX = localMouse.x / (target.width + target.padding);
      target.set("scaleX", newScaleX);
    } else if (by === "y") {
      newScaleY = localMouse.y / (target.height + target.padding);
      target.set("scaleY", newScaleY);
    }
    // 如果是反向拉伸 x
    if (newScaleX < 0) {
      if (t.originX === "left") t.originX = "right";
      else if (t.originX === "right") t.originX = "left";
    }
    // 如果是反向拉伸 y
    if (newScaleY < 0) {
      if (t.originY === "top") t.originY = "bottom";
      else if (t.originY === "bottom") t.originY = "top";
    }

    // console.log(constraintPosition, localMouse, t.originX, t.originY);

    // 缩放会改变物体位置，所以要重新设置
    target.setPositionByOrigin(constraintPosition, t.originX, t.originY);
  }
  /** 旋转当前选中物体，这里用的是 += */
  private _rotateObject(x: number, y: number) {
    const t = this._currentTransform;
    const o = this._offset;
    // 鼠标按下的点与物体中心点连线和 x 轴正方向形成的弧度
    const lastAngle = Math.atan2(t.ey - o.top - t.top, t.ex - o.left - t.left);
    // 鼠标拖拽的终点与物体中心点连线和 x 轴正方向形成的弧度
    const curAngle = Math.atan2(y - o.top - t.top, x - o.left - t.left);
    let angle = Util.radiansToDegrees(curAngle - lastAngle + t.theta); // 新的角度 = 变换的角度 + 原来的角度
    if (angle < 0) {
      angle = 360 + angle;
    }
    angle = angle % 360;
    t.target.angle = angle;
  }
  /**
   * 获取拖蓝选区包围的元素
   * 可能只有一个物体，那就是普通的点选
   * 如果有多个物体，那就生成一个组
   */
  private _findSelectedObjects(e: MouseEvent) {
    let objects: Shape[] = [], // 存储最终框选的元素
      x1 = this._groupSelector.ex,
      y1 = this._groupSelector.ey,
      x2 = x1 + this._groupSelector.left,
      y2 = y1 + this._groupSelector.top,
      selectionX1Y1 = new Point(Math.min(x1, x2), Math.min(y1, y2)),
      selectionX2Y2 = new Point(Math.max(x1, x2), Math.max(y1, y2));

    for (let i = 0, len = this._shapes.length; i < len; ++i) {
      let currentObject = this._shapes[i];

      if (!currentObject) continue;

      // 物体是否与拖蓝选区相交或者被选区包含
      if (
        currentObject.intersectsWithRect(selectionX1Y1, selectionX2Y2) ||
        currentObject.isContainedWithinRect(selectionX1Y1, selectionX2Y2)
      ) {
        currentObject.setActive(true);
        objects.push(currentObject);
      }
    }

    if (objects.length === 1) {
      this.setActiveObject(objects[0], e);
    } else if (objects.length > 1) {
      const newGroup = new Group(objects);
      this.setActiveGroup(newGroup);
      // newGroup.saveCoords();
      // this.emit('selection:created', { target: newGroup });
    }

    this.renderAll();
  } /** 记录当前物体的变换状态 */
  private _setupCurrentTransform(e: MouseEvent, target: Shape) {
    let action = "drag",
      corner,
      pointer = Util.getPointer(e, target.canvas.topCanvas, this.scale);

    corner = target._findTargetCorner(e, this._offset);
    if (corner) {
      // 根据点击的控制点判断此次操作是什么
      action =
        corner === "ml" || corner === "mr"
          ? "scaleX"
          : corner === "mt" || corner === "mb"
          ? "scaleY"
          : corner === "mtr"
          ? "rotate"
          : "scale";
    }

    let originX = "center",
      originY = "center";

    if (corner === "ml" || corner === "tl" || corner === "bl") {
      // 如果点击的是左边的控制点，则变换基点就是右边，以右边为基准向左变换
      originX = "right";
    } else if (corner === "mr" || corner === "tr" || corner === "br") {
      originX = "left";
    }

    if (corner === "tl" || corner === "mt" || corner === "tr") {
      // 如果点击的是上方的控制点，则变换基点就是底部，以底边为基准向上变换
      originY = "bottom";
    } else if (corner === "bl" || corner === "mb" || corner === "br") {
      originY = "top";
    }

    if (corner === "mtr") {
      // 如果是旋转操作，则基点就是中心点
      originX = "center";
      originY = "center";
    }

    // let center = target.getCenterPoint();
    this._currentTransform = {
      target,
      action,
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      offsetX: pointer.x - target.left,
      offsetY: pointer.y - target.top,
      originX,
      originY,
      ex: pointer.x,
      ey: pointer.y,
      left: target.left,
      top: target.top,
      theta: Util.degreesToRadians(target.angle),
      width: target.width * target.scaleX,
      mouseXSign: 1,
      mouseYSign: 1,
    };
    // 记录物体原始的 original 变换参数
    this._currentTransform.original = {
      left: target.left,
      top: target.top,
      scaleX: target.scaleX,
      scaleY: target.scaleY,
      originX,
      originY,
    };
    let { target: target2, ...other } = this._currentTransform;
    console.log(JSON.stringify(other, null, 4));

    // this._resetCurrentTransform(e); // 好像没必要重新赋值？除非按下了 altKey 键
  }
  /** 重置当前 transform 状态为 original，并设置 resizing 的基点 */
  private _resetCurrentTransform(e: MouseEvent) {
    let t = this._currentTransform;

    t.target.set("scaleX", t.original.scaleX);
    t.target.set("scaleY", t.original.scaleY);
    t.target.set("left", t.original.left);
    t.target.set("top", t.original.top);

    if (e.altKey) {
      if (t.originX !== "center") {
        if (t.originX === "right") {
          t.mouseXSign = -1;
        } else {
          t.mouseXSign = 1;
        }
      }
      if (t.originY !== "center") {
        if (t.originY === "bottom") {
          t.mouseYSign = -1;
        } else {
          t.mouseYSign = 1;
        }
      }

      t.originX = "center";
      t.originY = "center";
    } else {
      t.originX = t.original.originX;
      t.originY = t.original.originY;
    }
  }
  // #endregion

  // #region 组操作
  getActiveGroup(): Group {
    return this._activeGroup;
  }

  setActiveGroup(group: Group): Canvas {
    this._activeGroup = group;
    if (group) {
      group.canvas = this;
      group.setActive(true);
    }
    return this;
  }
  /** 将当前选中组失活 */
  discardActiveGroup(): Canvas {
    let g = this.getActiveGroup();
    if (g) g.destroy();
    return this.setActiveGroup(null);
  }
  /** 是否要处理组的逻辑 */
  private _shouldHandleGroupLogic(e: MouseEvent, target: Shape) {
    let activeObject = this._activeShape;
    return (
      e.shiftKey &&
      (this.getActiveGroup() || (activeObject && activeObject !== target))
    );
  }
  private _handleGroupLogic(e, target) {
    if (target === this.getActiveGroup()) {
      // if it's a group, find target again, this time skipping group
      target = this.findTarget(e, true);
      // if even object is not found, bail out
      if (!target || target.isType("group")) {
        return;
      }
    }
    let activeGroup = this.getActiveGroup();
    if (activeGroup) {
      if (activeGroup.contains(target)) {
        activeGroup.removeWithUpdate(target);
        this._resetObjectTransform(activeGroup);
        target.setActive(false);
        if (activeGroup.size() === 1) {
          this.discardActiveGroup();
        }
      } else {
        activeGroup.addWithUpdate(target);
        this._resetObjectTransform(activeGroup);
      }
      activeGroup.setActive(true);
    } else {
      if (this._activeShape) {
        if (target !== this._activeShape) {
          let group = new Group([this._activeShape, target]);
          this.setActiveGroup(group);
          activeGroup = this.getActiveGroup();
        }
      }
      target.setActive(true);
    }
  }
  // #endregion

  // #region 画布操作
  /** 添加元素
   * 目前的模式是调用 add 添加物体的时候就立马渲染，
   * 如果一次性加入大量元素，就会做很多无用功，
   * 所以可以加一个属性来先批量添加元素，最后再一次渲染（手动调用 renderAll 函数即可）
   */
  add(...args): Canvas {
    this._shapes.push.apply(this._shapes, args);
    for (let i = args.length; i--; ) {
      this._initObject(args[i]);
    }
    this.renderAll();
    return this;
  }
  getActiveObject() {
    return this._activeShape;
  }
  // 设置 canvas 的宽高以及起始点
  private _applyCanvasStyle(el: HTMLCanvasElement) {
    let width = this.width || el.width;
    let height = this.height || el.height;
    Util.setStyle(el, {
      position: "absolute",
      width: width + "px",
      height: height + "px",
      "margin-left": 0,
      "margin-top": 0,
    });
    el.width = width;
    el.height = height;
    Util.makeElementUnselectable(el);
  }

  /** 如果当前的物体在当前的组内，则要考虑扣去组的 top、left 值 */
  private _normalizePointer(object: Shape, pointer: Pos) {
    let activeGroup = this.getActiveGroup(),
      x = pointer.x,
      y = pointer.y;

    let isObjectInGroup =
      activeGroup && object.type !== "group" && activeGroup.contains(object);

    if (isObjectInGroup) {
      x -= activeGroup.left;
      y -= activeGroup.top;
    }
    return { x, y };
  }

  /** 将所有物体分成两个组，一组是未激活态，一组是激活态，然后将激活组放在最后，这样就能够绘制到最上层 */
  private _chooseObjectsToRender() {
    // 当前有没有激活的物体
    let activeObject = this.getActiveObject();
    // 当前有没有激活的组（也就是多个物体）
    let activeGroup = this.getActiveGroup();
    // 最终要渲染的物体顺序，也就是把激活的物体放在后面绘制
    let objsToRender = [];

    if (activeGroup) {
      // 如果选中多个物体
      const activeGroupObjects = [];
      for (let i = 0, length = this._shapes.length; i < length; i++) {
        let object = this._shapes[i];
        if (activeGroup.contains(object)) {
          activeGroupObjects.push(object);
        } else {
          objsToRender.push(object);
        }
      }
      objsToRender.push(activeGroup);
    } else if (activeObject) {
      // 如果只选中一个物体
      let index = this._shapes.indexOf(activeObject);
      objsToRender = this._shapes.slice();
      if (index > -1) {
        objsToRender.splice(index, 1);
        objsToRender.push(activeObject);
      }
    } else {
      // 所有物体都没被选中
      objsToRender = this._shapes;
    }

    return objsToRender;
  }

  private _initObject(obj: Shape) {
    obj.setupState();
    obj.setCoords();
    obj.canvas = this;
  }

  private _draw(ctx: CanvasRenderingContext2D, object: Shape) {
    if (!object) return;
    object.render(ctx);
  }

  /** 删除所有物体和清空画布 */
  clear() {
    this._shapes.length = 0;
    this.discardActiveGroup();

    this.clearContext(this.mCtx);
    this.clearContext(this.tCtx);

    this.renderAll();
    return this;
  }
  clearCanvas(canvas: HTMLCanvasElement) {
    canvas.width = this.width;
    canvas.height = this.height;
  }
  clearContext(ctx: CanvasRenderingContext2D): Canvas {
    ctx && ctx.clearRect(0, 0, this.width, this.height);
    return this;
  }
  /** 获取画布的偏移量，到时计算鼠标点击位置需要用到 */
  calcOffset(): Canvas {
    // TODO: 这边的外部偏移量计算有点问题
    this._offset = Util.getElementOffset(this.mainCanvas);
    return this;
  }

  /** 大部分是在 main-canvas 上先画未激活物体，再画激活物体 */
  renderAll(): Canvas {
    const ctxs = [this.mCtx, this.cCtx, this.tCtx];
    if (this.tCtx) {
      this.clearContext(this.tCtx);
    }

    this.clearContext(this.mCtx);

    ctxs.forEach((c) => c.save());
    ctxs.forEach((c) => c.scale(this.scale, this.scale));
    ctxs.forEach((c) =>
      c.translate(this._canvasOffset.left, this._canvasOffset.top)
    );

    // 先绘制未激活物体，再绘制激活物体
    const sortedObjects = this._chooseObjectsToRender();
    for (let i = 0, len = sortedObjects.length; i < len; ++i) {
      this._draw(this.mCtx, sortedObjects[i]);
    }

    ctxs.forEach((c) => c.restore());

    return this;
  }
  getPointer(e: MouseEvent): Pos {
    let pointer = Util.getPointer(e, this.topCanvas, this.scale);
    return {
      x: pointer.x - this._offset.left,
      y: pointer.y - this._offset.top,
    };
  }
  /** 检测是否有物体在鼠标位置 */
  findTarget(e: MouseEvent, skipGroup: boolean = false): Shape {
    let target;
    // let pointer = this.getPointer(e);

    // 优先考虑当前组中的物体，因为激活的物体被选中的概率大
    let activeGroup = this.getActiveGroup();
    if (activeGroup && !skipGroup && this.containsPoint(e, activeGroup)) {
      target = activeGroup;
      return target;
    }

    // 遍历所有物体，判断鼠标点是否在物体包围盒内
    for (let i = this._shapes.length; i--; ) {
      if (this._shapes[i] && this.containsPoint(e, this._shapes[i])) {
        target = this._shapes[i];
        break;
      }
    }

    if (target) return target;
  }
  // 判断鼠标点位是否存在图形中
  containsPoint(e: MouseEvent, target: Shape): boolean {
    let pointer = this.getPointer(e),
      xy = this._normalizePointer(target, pointer),
      x = xy.x,
      y = xy.y;

    // 下面这是参考文献，不过好像打不开
    // http://www.geog.ubc.ca/courses/klink/gis.notes/ncgia/u32.html
    // http://idav.ucdavis.edu/~okreylos/TAship/Spring2000/PointInPolygon.html

    // we iterate through each object. If target found, return it.
    let iLines = target._getImageLines(target.oCoords),
      xpoints = target._findCrossPoints(x, y, iLines);

    // if xcount is odd then we clicked inside the object
    // For the specific case of square images xcount === 1 in all true cases
    if (
      (xpoints && xpoints % 2 === 1) ||
      target._findTargetCorner(e, this._offset)
    ) {
      return true;
    }
    return false;
  }
  // #endregion

  // #region 顶层交互层操作
  /** 渲染 top-canvas，一般用于渲染拖蓝多选区域和涂鸦 */
  renderTop(): Canvas {
    let ctx = this.tCtx;
    this.clearContext(ctx);

    // 绘制拖蓝选区
    if (this._groupSelector) this._drawSelection();

    // 如果有选中物体
    // let activeGroup = this.getActiveGroup();
    // if (activeGroup) activeGroup.render(ctx);

    this.emit("after:render");
    return this;
  }
  /** 绘制框选区域 */
  private _drawSelection() {
    let ctx = this.tCtx,
      groupSelector = this._groupSelector,
      left = groupSelector.left,
      top = groupSelector.top,
      aleft = Math.abs(left),
      atop = Math.abs(top);

    ctx.fillStyle = this.selectionColor;

    ctx.fillRect(
      groupSelector.ex - (left > 0 ? 0 : -left),
      groupSelector.ey - (top > 0 ? 0 : -top),
      aleft,
      atop
    );

    ctx.lineWidth = this.selectionLineWidth;
    ctx.strokeStyle = this.selectionBorderColor;

    ctx.strokeRect(
      groupSelector.ex + STROKE_OFFSET - (left > 0 ? 0 : aleft),
      groupSelector.ey + STROKE_OFFSET - (top > 0 ? 0 : atop),
      aleft,
      atop
    );
  }
  /** 是否是拖蓝事件，也就是没有点选到物体 */
  private _shouldClearSelection(e: MouseEvent) {
    let target = this.findTarget(e),
      activeGroup = this.getActiveGroup();
    return (
      !target ||
      (target &&
        activeGroup &&
        !activeGroup.contains(target) &&
        activeGroup !== target &&
        !e.shiftKey)
    );
  }

  // #endregion

  // #region 鼠标样式相关
  /** 设置鼠标样式 */
  private _setCursor(value: string) {
    this.topCanvas.style.cursor = value;
  }
  /** 根据鼠标位置来设置相应的鼠标样式 */
  private _setCursorFromEvent(e: MouseEvent, target: Shape): boolean {
    let s = this.topCanvas.style;
    if (target) {
      let activeGroup = this.getActiveGroup();
      let corner =
        (!activeGroup || !activeGroup.contains(target)) &&
        target._findTargetCorner(e, this._offset);

      if (corner) {
        corner = corner as string;
        if (corner in cursorMap) {
          s.cursor = cursorMap[corner];
        } else if (corner === "mtr" && target.hasRotatingPoint) {
          s.cursor = CursorStyle.rotation;
        } else {
          s.cursor = CursorStyle.default;
          return false;
        }
      } else {
        s.cursor = CursorStyle.hover;
      }
      return true;
    } else {
      s.cursor = CursorStyle.default;
      return false;
    }
  }

  // #endregion
}
