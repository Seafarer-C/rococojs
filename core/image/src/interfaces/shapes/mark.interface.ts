import { IShape } from "./shape.interface";

export type MarkType = "rect" | "circle" | "arrow" | "line" | "text";

// 标注
export interface IMark extends IShape {
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
}

// 圆的属性
export interface ICircleProperty {
  // 是否填充
  fill: Boolean;
  // 颜色
  color: String;
  // 半径
  radius: Number;
  // 线框宽度
  lineWidth: Number;
}
// 矩形的属性
export interface IRectProperty {
  // 是否填充
  fill: Boolean;
  // 颜色
  color: String;
  // 大小
  size: {
    width: Number;
    height: Number;
  };
}
// 箭头的属性
export interface IArrowProperty {}
// 线的属性
export interface ILineProperty {}
// 文字的属性
export interface ITextProperty {}
