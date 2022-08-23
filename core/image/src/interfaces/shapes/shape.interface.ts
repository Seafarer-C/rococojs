export interface IShape {
  id?: string;
  // 当前画布的 2d 上下文
  canvasCtx;
  // 层级
  zIndex: number;
  // 处于画布中的位置
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  // 是否被选中高亮
  active: boolean;
  // 光标是否在图形内
  hover: boolean;

  // 加载
  load?: (...args) => any;
  // 绘制
  draw: Function;

  /**
   * 高亮选中或者取消选中
   * @param active 是否设置高亮
   */
  setHeightLight: (active: boolean) => void;

  /**
   * 移动图形
   */
  move: Function;
}
