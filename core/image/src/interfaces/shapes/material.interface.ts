import { IShape } from "./shape.interface";

export interface IMaterial extends IShape {
  // 素材资源
  src: string;
  img?: HTMLImageElement;
  complete: Boolean;

  load: (info: IMaterial & { ctx }) => Promise<void>;
}
