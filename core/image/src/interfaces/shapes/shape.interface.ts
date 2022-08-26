export type ShapeType = "image" | "rect" | "circle" | "arrow" | "line" | "text";
export interface IShape {
  id?: string;
  // 元素类型
  type: ShapeType;
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
  // 光标是否在图形内
  hover: boolean;

  // 加载
  load?: (...args) => any;

  /**
   * 移动图形
   */
  move: Function;
}
