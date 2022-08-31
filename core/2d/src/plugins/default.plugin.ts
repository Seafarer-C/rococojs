/** 一些鼠标样式 */
enum CursorStyle {
  default = "default",
  move = "move",
  hover = "move",
  rotation = "crosshair",
}

export default {
  mouseDown: ({ e, rococoCanvas }, next) => {
    // 只处理左键点击，要么是拖蓝事件、要么是点选事件
    let isLeftClick = "which" in e ? e.which === 1 : e.button === 1;
    if (!isLeftClick) return;

    // 这个我猜是为了保险起见，ignore if some object is being transformed at rococoCanvas moment
    if (rococoCanvas._currentTransform) return;

    let target = rococoCanvas.findTarget(e);
    let pointer = rococoCanvas.getPointer(e);
    let corner;
    rococoCanvas._previousPointer = pointer;

    if (rococoCanvas._shouldClearSelection(e)) {
      // 如果是拖蓝选区事件
      rococoCanvas._groupSelector = {
        // 重置选区状态
        ex: pointer.x,
        ey: pointer.y,
        top: 0,
        left: 0,
      };
      // 让所有元素失去激活状态
      rococoCanvas.deactivateAllWithDispatch();
    } else {
      // 如果是点选操作，接下来就要为各种变换做准备
      target.saveState();

      // 判断点击的是不是控制点
      corner = target._findTargetCorner(e, rococoCanvas._offset);
      if (rococoCanvas._shouldHandleGroupLogic(e, target)) {
        // 如果是选中组
        rococoCanvas._handleGroupLogic(e, target);
        target = rococoCanvas.getActiveGroup();
      } else {
        // 如果是选中单个物体
        if (target !== rococoCanvas.getActiveGroup()) {
          rococoCanvas.deactivateAll();
        }
        rococoCanvas.setActiveObject(target, e);
      }
      rococoCanvas._setupCurrentTransform(e, target);
    }
    // 不论是拖蓝选区事件还是点选事件，都需要重新绘制
    // 拖蓝选区：需要把之前激活的物体取消选中态
    // 点选事件：需要把当前激活的物体置顶
    rococoCanvas.renderAll();
    next();
  },
  mouseMove: ({ e, pointer, rococoCanvas }, next) => {
    let target;

    let groupSelector = rococoCanvas._groupSelector;

    if (groupSelector) {
      // 如果有拖蓝框选区域

      groupSelector.left =
        pointer.x - rococoCanvas._offset.left - groupSelector.ex;
      groupSelector.top =
        pointer.y - rococoCanvas._offset.top - groupSelector.ey;
      rococoCanvas.renderTop();
    } else if (!rococoCanvas._currentTransform) {
      // 如果是 hover 事件，这里我们只需要改变鼠标样式，并不会重新渲染
      let style = rococoCanvas.topCanvas.style;
      target = rococoCanvas.findTarget(e);

      if (target) {
        rococoCanvas._setCursorFromEvent(e, target);
      } else {
        style.cursor = CursorStyle.default;
      }
    } else {
      // 如果是旋转、缩放、平移等操作

      let x = pointer.x,
        y = pointer.y;

      rococoCanvas._currentTransform.target.isMoving = true;

      let t = rococoCanvas._currentTransform,
        reset = false;

      if (rococoCanvas._currentTransform.action === "rotate") {
        // 如果是旋转操作
        rococoCanvas._rotateObject(x, y);
      } else if (rococoCanvas._currentTransform.action === "scale") {
        // 如果是整体缩放操作
        if (e.shiftKey) {
          rococoCanvas._currentTransform.currentAction = "scale";
          rococoCanvas._scaleObject(x, y);
        } else {
          if (!reset && t.currentAction === "scale") {
            rococoCanvas._resetCurrentTransform(e);
          }

          rococoCanvas._currentTransform.currentAction = "scaleEqually";
          rococoCanvas._scaleObject(x, y, "equally");
        }
      } else if (rococoCanvas._currentTransform.action === "scaleX") {
        // 如果只是缩放 x
        rococoCanvas._scaleObject(x, y, "x");
      } else if (rococoCanvas._currentTransform.action === "scaleY") {
        // 如果只是缩放 y
        rococoCanvas._scaleObject(x, y, "y");
      } else {
        // 如果是拖拽物体
        rococoCanvas._translateObject(x, y);
        rococoCanvas._setCursor(CursorStyle.move);
      }

      rococoCanvas.renderAll();
    }

    next();
  },
  mouseUp: ({ e, rococoCanvas }, next) => {
    let target;
    if (rococoCanvas._currentTransform) {
      let transform = rococoCanvas._currentTransform;

      target = transform.target;
      if (target._scaling) {
        target._scaling = false;
      }

      // 每次物体更改都要重新计算新的控制点
      let i = rococoCanvas._shapes.length;
      while (i--) {
        rococoCanvas._shapes[i].setCoords();
      }

      target.isMoving = false;

      // 在点击之间如果物体状态改变了才派发事件
      if (target.hasStateChanged()) {
        // rococoCanvas.emit("object:modified", { target });
        // target.emit("modified");
      }
    }

    rococoCanvas._currentTransform = null;

    if (rococoCanvas._groupSelector) {
      // 如果有拖蓝框选区域
      rococoCanvas._findSelectedObjects(e);
    }
    let activeGroup = rococoCanvas.getActiveGroup();
    if (activeGroup) {
      //重新设置 激活组 中的物体
      activeGroup.setObjectsCoords();
      activeGroup.set("isMoving", false);
      rococoCanvas._setCursor(CursorStyle.default);
    }
    rococoCanvas._groupSelector = null;
    rococoCanvas.renderAll();

    rococoCanvas._setCursorFromEvent(e, target);

    next();
  },
  mouseWheel: ({ e, rococoCanvas }, next) => {
    let b = true;
    if (e.wheelDelta) {
      b = e.wheelDelta > 0;
    } else {
      b = e.detail < 0;
    }
    console.log(e.wheelDelta, b);

    if (b) {
      rococoCanvas.zoomIn(true);
    } else {
      rococoCanvas.zoomOut(true);
    }
    next();
  },
};
