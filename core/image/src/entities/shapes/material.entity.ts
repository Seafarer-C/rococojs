import { IMaterial } from "../../interfaces/shapes/material.interface";
import { Shape } from "./shape.entity";

// 素材
export class Material extends Shape implements IMaterial {
  constructor() {
    super();
    this.size = this.size || {
      width: 0,
      height: 0,
    };
  }

  src: string;
  // 图片实例
  img?: HTMLImageElement;
  // 层级

  // 是否完成加载
  get complete(): Boolean {
    return this.img?.complete || false;
  }

  // 加载图片素材
  async load(info: IMaterial & { ctx }) {
    const { id, src, position, size, zIndex, ctx } = info;
    this.ctx = ctx;
    this.src = src;
    this.id = id || Math.round(Math.random() * 10000).toString();
    this.position = position || {
      x: 0,
      y: 0,
    };
    this.img = new Image();
    this.img.src = src;
    this.zIndex = zIndex;
    await new Promise((resolve, reject) => {
      try {
        this.img.onload = () => {
          this.size = size || {
            width: this.img.width,
            height: this.img.height,
          };
          resolve(true);
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * 绘制图片素材
   */
  draw() {
    if (this.complete) {
      const { x, y } = this.position;
      const { width, height } = this.size;
      this.ctx.drawImage(this.img, x, y, width, height);
    }
  }
}
