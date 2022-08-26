import { contextValue } from "../../context";
import type {
  IShape,
  ShapeType,
} from "../../interfaces/shapes/shape.interface";

export class Shape implements IShape {
  id?: string;
  // 元素类型
  type: ShapeType;

  @contextValue("mousePosition")
  private mousePosition;

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
  } = {
    width: undefined,
    height: undefined,
  };

  // 光标是否在图形内
  get hover() {
    const { x, y } = this.mousePosition;
    const rangeX = [this.position.x, this.position.x + this.size.width];
    const rangeY = [this.position.y, this.position.y + this.size.height];
    console.log(rangeX, rangeY, this.mousePosition, this.position);
    console.log(x >= rangeX[0], x <= rangeX[1], y >= rangeY[0], y <= rangeY[1]);

    if (x >= rangeX[0] && x <= rangeX[1] && y >= rangeY[0] && y <= rangeY[1]) {
      return true;
    }
    return false;
  }

  /**
   * 移动元素
   */
  move(position: { x: number; y: number }) {
    this.position = position;
  }
}
