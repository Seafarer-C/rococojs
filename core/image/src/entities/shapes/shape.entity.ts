import { storeValue } from "../../context";
import { IShape } from "../../interfaces/shapes/shape.interface";

export class Shape implements IShape {
  id?: string;
  // 当前画布的 2d 上下文
  @storeValue("canvasCtx")
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
  active: boolean = false;
  // 光标是否在图形内
  hover: boolean = false;

  draw() {}

  /**
   * 高亮选中或者取消选中
   * @param active 是否设置高亮
   */
  setHeightLight() {
    this.active = true;
    const { x, y } = this.position;
    const { width, height } = this.size;
    this.canvasCtx.strokeStyle = "blue";
    this.canvasCtx.strokeRect(x, y, width, height);
  }

  move() {}
}
