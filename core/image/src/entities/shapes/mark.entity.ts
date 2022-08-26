import type {
  IMark,
  ICircleProperty,
  IRectProperty,
  IArrowProperty,
  ILineProperty,
  ITextProperty,
} from "../../interfaces/shapes/mark.interface";
import { Shape } from "./shape.entity";

// 标注
export class Mark extends Shape implements IMark {
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
}
