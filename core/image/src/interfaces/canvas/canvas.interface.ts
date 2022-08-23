import { IShape } from "../shapes/shape.interface";

export interface ICanvasAgent {
  ctx;
  canvas;
  width: number;
  height: number;

  // 缩放比
  scale: number;
  // 上一次的缩放比
  preScale: number;
  // 每次缩放的步长
  scaleStep: number;
  // 最大缩放比
  scaleMax: number;
  scaleMin: number;
  // 光标位置
  mousePosition: {
    x: number;
    y: number;
  };
  // 偏移量
  offset: {
    x: number;
    y: number;
  };
  currentOffset: {
    x: number;
    y: number;
  };

  // 画布中的元素
  shapes: Array<IShape>;
  // 高亮选中对象
  heightLightTarget: IShape;
}
