import type { IMaterial } from "./shapes/material.interface";
import type { IMark } from "./shapes/mark.interface";

export interface ISuperMarker {
  width: number;
  height: number;
  // 容器
  containView;

  // 缩放比
  scale: number;
  // 上一次的缩放比
  preScale: number;
  // 每次缩放的步长
  scaleStep: number;
  // 最大缩放比
  scaleMax: number;
  scaleMin: number;
  // canvas 实例
  canvas;
  // canvas 2d 上下文
  ctx;
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

  // 素材资源
  materials: Array<IMaterial>;
  // 标注信息
  marks: Array<IMark>;
  // 是否显示标注
  showMark: Boolean;
  // 创建画布
  createCanvas: () => void;
  /**
   * 设置画布及容器大小
   * @param width 宽度
   * @param height 高度
   */
  setSize: (width: number, height: number) => void;
  // 清空画布
  clearCanvas: () => void;
  // 重制画布
  resetCanvas: () => void;
  // 初始化加载素材
  loadMaterials: (infos: Array<IMaterial>) => this;
  // 初始化加载标注
  loadMarks: (infos: Array<IMark>) => this;
  // 节流绘制
  drawThrottle: () => void;
  drawCanvas: () => void;
}
