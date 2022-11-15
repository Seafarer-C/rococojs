/** 一些鼠标样式 */
enum CursorStyle {
  default = "default",
  move = "move",
  hover = "move",
  rotation = "crosshair",
  grab = "grab",
}

const position = {
  x: 0,
  y: 0,
};
let dragStart: Boolean = false;
// 是否是通过滚轮点击切换至 grab 状态
let isMouseWheelGrab: Boolean = false;
// 之前所处在的 action
let preAction: string = "";

export default {
  mouseDown: ({ e, pointer, rococo2d }, next) => {
    next();
    // 滚轮点击会将操作转台转化为 grab
    if (e.buttons === 4) {
      preAction = rococo2d.action;
      rococo2d.action = "grab";
      isMouseWheelGrab = true;
    }
    if (rococo2d.action !== "grab") return;
    rococo2d.setCursor(CursorStyle.grab);
    position.x = pointer.x;
    position.y = pointer.y;
    dragStart = true;
  },
  mouseMove: ({ pointer, rococo2d }, next) => {
    next();
    if (rococo2d.action !== "grab") return;
    if (!dragStart) return;
    rococo2d._canvasOffset.left += pointer.x - position.x;
    rococo2d._canvasOffset.top += pointer.y - position.y;
    rococo2d.renderAll();
  },
  mouseUp: ({ rococo2d }, next) => {
    next();
    if (rococo2d.action !== "grab") return;
    position.x = 0;
    position.y = 0;
    dragStart = false;
    if (isMouseWheelGrab) {
      isMouseWheelGrab = false;
      rococo2d.action = preAction;
      rococo2d.setCursor(CursorStyle.default);
    }
  },
};
