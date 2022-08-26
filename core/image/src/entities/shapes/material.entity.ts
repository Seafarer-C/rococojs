import { IMaterial } from "../../interfaces/shapes/material.interface";
import { Shape } from "./shape.entity";

// 素材
export class Material extends Shape implements IMaterial {
  type: "image" = "image";
  src: string;
  // 图片实例
  img?: HTMLImageElement;
  // 层级

  // 是否完成加载
  get complete(): Boolean {
    return this.img?.complete || false;
  }

  // 加载图片素材
  async load(info: IMaterial) {
    const { id, src, position, size, zIndex } = info;
    this.src = src;
    this.id = id || this.src;
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
}
