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
    if (rococo2d.action !== "drag") return;
  },
  mouseMove: ({ e, pointer, rococo2d }, next) => {
    next();
    if (rococo2d.action !== "drag") return;
  },
  mouseUp: ({ e, rococo2d }, next) => {
    next();
    if (rococo2d.action !== "drag") return;
  },
};
