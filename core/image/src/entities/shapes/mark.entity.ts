import type {
  IMark,
  MarkType,
  ICircleProperty,
  IRectProperty,
  IArrowProperty,
  ILineProperty,
  ITextProperty,
} from "../../interfaces/shapes/mark.interface";
import { Shape } from "./shape.entity";

// 标注
export class Mark extends Shape implements IMark {
  // 标注类型
  type: MarkType;
  // 标注对应的素材 id
  materialId?: string;
  // 与对应素材的相对位置
  relativePosition?: {
    x: number;
    y: number;
  };
  // 标注的相关属性
  properties?:
    | ICircleProperty
    | IRectProperty
    | IArrowProperty
    | ILineProperty
    | ITextProperty;

  // 根据数据进行初始化
  load(info) {
    for (const key in info) {
      this[key] = info[key];
    }
  }

  /**
   * 绘制标注
   */
  draw() {
    const { x, y } = this.position;
    switch (this.type) {
      case "arrow":
        break;
      case "circle":
        this.ctx.beginPath();
        this.ctx.arc(x, y, 100, 0, Math.PI * 2, true);
        this.ctx.strokeStyle = "#FFA500";
        this.ctx.stroke();
        break;
      case "line":
        this.ctx.beginPath();
        this.ctx.closePath();
        // 通过线条来绘制图形轮廓。
        // stroke()
        // 填充
        // fill()
        break;
      case "rect":
        // fillRect(x, y, width, height)

        // strokeRect(x, y, width, height)

        // clearRect(x, y, width, height)
        break;
      case "text":
        break;
    }
  }
}
