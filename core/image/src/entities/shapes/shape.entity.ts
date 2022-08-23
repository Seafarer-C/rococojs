import { IShape } from "../../interfaces/shapes/shape.interface";

export class Shape implements IShape {
  id?: string;
  // 当前画布的 2d 上下文
  ctx;
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

  draw() {}

  /**
   * 高亮选中或者取消选中
   * @param active 是否设置高亮
   */
  setHeightLight(active: boolean) {
    this.active = active;
    if (active) {
      const { x, y } = this.position;
      const { width, height } = this.size;
      this.ctx.strokeStyle = "blue";
      this.ctx.strokeRect(x, y, width, height);
    } else {
    }
  }
}
