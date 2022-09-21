/** 一些鼠标样式 */
enum CursorStyle {
  default = "default",
  move = "move",
  hover = "move",
  rotation = "crosshair",
}

export default {
  mouseDown: ({ e, rococo2d }, next) => {
    next();
    if (rococo2d.action !== "default") return;
    // 只处理左键点击，要么是拖蓝事件、要么是点选事件
    let isLeftClick = "which" in e ? e.which === 1 : e.button === 1;
    if (!isLeftClick) return;

    // 这个我猜是为了保险起见，ignore if some object is being transformed at rococo2d moment
    if (rococo2d._currentTransform) return;

    let target = rococo2d.findTarget(e);
    let pointer = rococo2d.getPointer(e);
    let corner;
    rococo2d._previousPointer = pointer;

    if (rococo2d.shouldClearSelection(e)) {
      // 如果是拖蓝选区事件
      rococo2d._groupSelector = {
        // 重置选区状态`
        ex: pointer.x,
        ey: pointer.y,
        top: 0,
        left: 0,
      };
      // 让所有元素失去激活状态
      rococo2d.deactivateAllWithDispatch();
    } else {
      // 如果是点选操作，接下来就要为各种变换做准备
      target.saveState();

      // 判断点击的是不是控制点
      corner = target._findTargetCorner(e, rococo2d._offset);
      if (rococo2d.shouldHandleGroupLogic(e, target)) {
        // 如果是选中组
        rococo2d.handleGroupLogic(e, target);
        target = rococo2d.getActiveGroup();
      } else {
        // 如果是选中单个物体
        if (target !== rococo2d.getActiveGroup()) {
          rococo2d.deactivateAll();
        }
        rococo2d.setActiveObject(target, e);
      }
      rococo2d.setupCurrentTransform(e, target);
    }
    // 不论是拖蓝选区事件还是点选事件，都需要重新绘制
    // 拖蓝选区：需要把之前激活的物体取消选中态
    // 点选事件：需要把当前激活的物体置顶
    rococo2d.renderAll();
  },
  mouseMove: ({ e, pointer, rococo2d }, next) => {
    next();
    if (rococo2d.action !== "default") return;
    let target;

    let groupSelector = rococo2d._groupSelector;

    if (groupSelector) {
      // 如果有拖蓝框选区域

      groupSelector.left = pointer.x - rococo2d._offset.left - groupSelector.ex;
      groupSelector.top = pointer.y - rococo2d._offset.top - groupSelector.ey;
      rococo2d.renderTop();
    } else if (!rococo2d._currentTransform) {
      // 如果是 hover 事件，这里我们只需要改变鼠标样式，并不会重新渲染
      let style = rococo2d.topCanvas.style;
      target = rococo2d.findTarget(e);

      if (target) {
        rococo2d.setCursorFromEvent(e, target);
      } else {
        style.cursor = CursorStyle.default;
      }
    } else {
      // 如果是旋转、缩放、平移等操作

      let x = pointer.x,
        y = pointer.y;

      rococo2d._currentTransform.target.isMoving = true;

      let t = rococo2d._currentTransform,
        reset = false;

      if (rococo2d._currentTransform.action === "rotate") {
        // 如果是旋转操作
        rococo2d.rotateObject(x, y);
      } else if (rococo2d._currentTransform.action === "scale") {
        // 如果是整体缩放操作
        if (e.shiftKey) {
          rococo2d._currentTransform.currentAction = "scale";
          rococo2d.scaleObject(x, y);
        } else {
          if (!reset && t.currentAction === "scale") {
            rococo2d.resetCurrentTransform(e);
          }

          rococo2d._currentTransform.currentAction = "scaleEqually";
          rococo2d.scaleObject(x, y, "equally");
        }
      } else if (rococo2d._currentTransform.action === "scaleX") {
        // 如果只是缩放 x
        rococo2d.scaleObject(x, y, "x");
      } else if (rococo2d._currentTransform.action === "scaleY") {
        // 如果只是缩放 y
        rococo2d.scaleObject(x, y, "y");
      } else {
        // 如果是拖拽物体
        rococo2d.translateObject(x, y);
        rococo2d.setCursor(CursorStyle.move);
      }

      rococo2d.renderAll();
    }
  },
  mouseUp: ({ e, rococo2d }, next) => {
    next();
    if (rococo2d.action !== "default") return;
    let target;
    if (rococo2d._currentTransform) {
      let transform = rococo2d._currentTransform;

      target = transform.target;
      if (target._scaling) {
        target._scaling = false;
      }

      // 每次物体更改都要重新计算新的控制点
      let i = rococo2d._shapes.length;
      while (i--) {
        rococo2d._shapes[i].setCoords();
      }

      target.isMoving = false;

      // 在点击之间如果物体状态改变了才派发事件
      if (target.hasStateChanged()) {
        // rococo2d.emit("object:modified", { target });
        // target.emit("modified");
      }
    }

    rococo2d._currentTransform = null;

    if (rococo2d._groupSelector) {
      // 如果有拖蓝框选区域
      rococo2d.findSelectedObjects(e);
    }
    let activeGroup = rococo2d.getActiveGroup();
    if (activeGroup) {
      //重新设置 激活组 中的物体
      activeGroup.setObjectsCoords();
      activeGroup.set("isMoving", false);
      rococo2d.setCursor(CursorStyle.default);
    }
    rococo2d._groupSelector = null;
    rococo2d.renderAll();

    rococo2d.setCursorFromEvent(e, target);
  },
  mouseWheel: ({ e, pointer, rococo2d }, next) => {
    let b = true;
    if (e.wheelDelta) {
      b = e.wheelDelta > 0;
    } else {
      b = e.detail < 0;
    }

    if (b) {
      rococo2d.zoomIn(true, pointer);
    } else {
      rococo2d.zoomOut(true, pointer);
    }
    next();
  },
};
